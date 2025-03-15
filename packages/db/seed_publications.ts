import { db } from '.';
import { publicationsTable, tagsTable, publicationtagsTable } from './schema';
import fs from 'fs';

async function main() {
    try {
        console.log('Starting database import process...');

        // Read the JSON files
        const postsData = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
        const tagsData = JSON.parse(fs.readFileSync('tags.json', 'utf8'));

        // Clear existing data (optional - remove if you want to keep existing data)
        console.log('Clearing existing relationship data...');
        await db.delete(publicationtagsTable);
        console.log('Clearing existing publications data...');
        await db.delete(publicationsTable);
        console.log('Clearing existing tags data...');
        await db.delete(tagsTable);

        // 1. First insert all tags and store their IDs
        console.log('Inserting tags...');
        const tagMap = new Map(); // Map to store tag name -> tag ID

        // Check if tagsData has the new structure or the old one
        if (Array.isArray(tagsData.tags) && typeof tagsData.tags[0] === 'string') {
            // Old format - single name field
            console.log('Processing tags in old format (single name)...');
            for (const tagName of tagsData.tags) {
                const [insertedTag] = await db.insert(tagsTable)
                    .values({
                        nameDe: tagName.trim(),
                        nameEn: tagName.trim() // Use the same value for both fields as fallback
                    })
                    .returning({ id: tagsTable.id, nameDe: tagsTable.nameDe });

                tagMap.set(insertedTag.nameDe, insertedTag.id);
            }
        } else if (Array.isArray(tagsData.tags) && typeof tagsData.tags[0] === 'object') {
            // New format - separate nameDe and nameEn fields
            console.log('Processing tags in new format (separate nameDe and nameEn)...');
            for (const tag of tagsData.tags) {
                const [insertedTag] = await db.insert(tagsTable)
                    .values({
                        nameDe: tag.nameDe.trim(),
                        nameEn: tag.nameEn.trim()
                    })
                    .returning({ id: tagsTable.id, nameDe: tagsTable.nameDe });

                // Store by German name for matching with publications
                tagMap.set(insertedTag.nameDe, insertedTag.id);
            }
        } else {
            throw new Error('Unexpected format in tags.json');
        }

        console.log(`Inserted ${tagMap.size} tags successfully`);

        // 2. Insert publications
        console.log('Inserting publications...');
        for (const post of postsData) {
            // Insert the publication
            const [insertedPublication] = await db.insert(publicationsTable)
                .values({
                    titleDe: post.titleDe,
                    titleEn: post.titleEn,
                    publishedAt: new Date(post.date),
                    author: post.author || 'Unknown', // Fallback if author is missing
                    contentDe: post.contentDe,
                    contentEn: post.contentEn,
                    imagePath: post.image
                })
                .returning({ id: publicationsTable.id });

            // 3. Create publication-tag relationships
            if (post.tags && post.tags.length > 0) {
                const publicationTagValues = [];
                for (const tagName of post.tags) {
                    const trimmedTagName = tagName.trim();
                    const tagId = tagMap.get(trimmedTagName);

                    if (tagId) {
                        publicationTagValues.push({
                            publicationId: insertedPublication.id,
                            tagId: tagId
                        });
                    } else {
                        console.warn(`Warning: Tag "${trimmedTagName}" not found in the tag map`);
                    }
                }

                if (publicationTagValues.length > 0) {
                    await db.insert(publicationtagsTable)
                        .values(publicationTagValues);
                }
            }

            // Use titleDe for logging, or titleEn as fallback
            const title = post.titleDe || post.titleEn || 'Untitled';
            console.log(`Inserted publication: "${title}" with ID ${insertedPublication.id}`);
        }

        console.log('Database import completed successfully!');
    } catch (error) {
        console.error('Error during import:', error);
        process.exit(1);
    }
}

main();
