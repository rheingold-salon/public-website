import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import { db } from '@/db';
import { publicationsTable, tagsTable, publicationtagsTable } from './schema.js';

function getThumbnailId(item) {
    if (item["wp:postmeta"]) {
        // Handle case where there's only one postmeta (might be an object, not array)
        const postmetas = Array.isArray(item["wp:postmeta"])
            ? item["wp:postmeta"]
            : [item["wp:postmeta"]];
        // Loop through postmeta entries
        for (const meta of postmetas) {
            // Check if this is the attached file meta key
            if (meta["wp:meta_key"] === "_thumbnail_id") {
                return meta["wp:meta_value"];
            }
        }
    }
    return null;
}

function normalizeImagePath(filePath) {
    return filePath.replace(/(-\d+)?(\.\w+)$/, '$2');
}

function getFileName(item) {
    // Check if postmeta exists and is an array
    if (item["wp:postmeta"]) {
        // Handle case where there's only one postmeta (might be an object, not array)
        const postmetas = Array.isArray(item["wp:postmeta"])
            ? item["wp:postmeta"]
            : [item["wp:postmeta"]];
        // Loop through postmeta entries
        for (const meta of postmetas) {
            // Check if this is the attached file meta key
            if (meta["wp:meta_key"] === "_wp_attached_file") {
                const filePath = normalizeImagePath(meta["wp:meta_value"]);
                const fileName = filePath.split("/").pop();
                const destinationPath = "../../public/static/images/publications/" + fileName;
                if (!fs.existsSync(destinationPath)) {
                    fs.renameSync("./wordpress_media/" + filePath, destinationPath)
                }
                return fileName;
            }
        }
    }
    return null;
}

// Function to clean WordPress content and convert to valid JSX
function cleanWordPressContent(content) {
    if (!content) return '';

    // Remove WordPress block comments and markers
    let cleaned = content
        // Remove opening block comments like <!-- wp:paragraph -->
        .replace(/<!-- wp:[^>]+ -->\n?/g, '')
        // Remove closing block comments like <!-- /wp:paragraph -->
        .replace(/<!-- \/wp:[^>]+ -->\n?/g, '')
        // Remove wp:group and similar blocks
        .replace(/<!-- wp:group[^>]* -->\n?/g, '')
        .replace(/<!-- \/wp:group -->\n?/g, '')
        // Clean up any duplicate newlines that resulted from removing blocks
        .replace(/\n{3,}/g, '\n\n');

    // Fix target="_blank" to be compliant with Next.js (add noreferrer)
    cleaned = cleaned.replace(/target="_blank"(?! rel)/g, 'target="_blank" rel="noreferrer"');

    // Fix any self-closing div tags that might not be properly closed
    cleaned = cleaned.replace(/<div([^>]*)\/>/g, '<div$1></div>');

    // Replace empty paragraphs
    cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

    return cleaned;
}

async function main() {
    const xmlData_pub = fs.readFileSync("publications.xml", "utf8");
    const xmlData_med = fs.readFileSync("medien.xml", "utf8");
    const parser = new XMLParser({
        ignoreAttributes: false,
        parseTagValue: true,
        processEntities: false
    });

    const json_pub = parser.parse(xmlData_pub);
    const items_pub = json_pub.rss.channel.item || [];
    const json_med = parser.parse(xmlData_med);
    const items_med = json_med.rss.channel.item || [];

    const medien = new Map(items_med.map((item) => ([
        item["wp:post_id"], getFileName(item),
    ])));

    // First, insert publications
    const publicationsData = items_pub.map((item) => ({
        title: item.title,
        date: item["wp:post_date"],
        author: item["dc:creator"],
        content: cleanWordPressContent(item["content:encoded"]),
        imagePath: medien.get(getThumbnailId(item)) || '', // Ensure we don't insert null
    }));

    console.log("Sample publication:", publicationsData[0]);

    // Clear and insert publications
    await db.delete(publicationsTable);
    const insertedPublications = await db.insert(publicationsTable).values(publicationsData).returning();

    // Create a map of publications by their original index for later reference
    const publicationIdMap = new Map();
    insertedPublications.forEach((pub, index) => {
        publicationIdMap.set(index, pub.id);
    });

    // Extract unique tags and prepare them for insertion
    const tagSet = new Set();
    items_pub.forEach((item) => {
        if (!item.category) return;
        const itemTags = Array.isArray(item.category) ? item.category : [item.category];
        itemTags.forEach((tag) => {
            const tagName = tag["#text"];
            if (tagName) tagSet.add(tagName);
        });
    });

    // Convert Set to array of objects for insertion
    const tagsData = Array.from(tagSet).map(tagName => ({ name: tagName }));
    console.log("Tags to insert:", tagsData);

    // Clear and insert tags
    await db.delete(tagsTable);
    const insertedTags = await db.insert(tagsTable).values(tagsData).returning();

    // Create a map of tag names to their IDs
    const tagIdMap = new Map();
    insertedTags.forEach(tag => {
        tagIdMap.set(tag.name, tag.id);
    });

    // Prepare publication-tag relationships with deduplication
    const publicationTagsSet = new Set(); // Use to track unique pairs
    const publicationTagsData = [];

    items_pub.forEach((item, index) => {
        if (!item.category) return;
        const itemTags = Array.isArray(item.category) ? item.category : [item.category];

        itemTags.forEach((tag) => {
            const tagName = tag["#text"];
            const tagId = tagIdMap.get(tagName);
            const publicationId = publicationIdMap.get(index);

            if (tagId && publicationId) {
                // Create a unique key for this publication-tag pair
                const pairKey = `${publicationId}-${tagId}`;

                // Only add if we haven't seen this pair before
                if (!publicationTagsSet.has(pairKey)) {
                    publicationTagsSet.add(pairKey);
                    publicationTagsData.push({
                        publicationId: publicationId,
                        tagId: tagId
                    });
                }
            }
        });
    });

    console.log(`Found ${publicationTagsData.length} unique publication-tag pairs`);

    // Clear and insert publication tags
    await db.delete(publicationtagsTable);
    await db.insert(publicationtagsTable).values(publicationTagsData);

    console.log("Database seeding completed successfully!");
}

main().catch(err => {
    console.error("Error seeding database:", err);
    process.exit(1);
});
