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

        for (const tagName of tagsData.tags) {
            const [insertedTag] = await db.insert(tagsTable)
                .values({ name: tagName.trim() })
                .returning({ id: tagsTable.id, name: tagsTable.name });

            tagMap.set(insertedTag.name, insertedTag.id);
        }
        console.log(`Inserted ${tagMap.size} tags successfully`);

        // 2. Insert publications
        console.log('Inserting publications...');
        for (const post of postsData) {
            // Extract date from the post - You might need to adjust this based on available data
            // Since your data doesn't have a date field, we'll use current date as fallback
            // Insert the publication
            const [insertedPublication] = await db.insert(publicationsTable)
                .values({
                    title: post.title,
                    publishedAt: new Date(post.date),
                    author: post.author || 'Unknown', // Fallback if author is missing
                    content: post.content,
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

            console.log(`Inserted publication: "${post.title}" with ID ${insertedPublication.id}`);
        }

        console.log('Database import completed successfully!');
    } catch (error) {
        console.error('Error during import:', error);
        process.exit(1);
    }
}

main();
