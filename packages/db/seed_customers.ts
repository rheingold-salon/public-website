import { db } from "@/db";
import { customergroupsTable } from "./schema";
import fs from 'fs';
import path from 'path';

const main = async () => {
    try {
        const filePath = path.resolve(__dirname, 'customer_groups_rows.csv'); // Correct relative path
        const csvData = fs.readFileSync(filePath, 'utf8');
        const rows = csvData.split('\n').slice(1); // Skip header row

        const customerGroupData = rows.map(row => {
            const [, , , name] = row.trim().split(',');

            const name_start = name.split(' ')[0];
            let name_en = "";
            let images_folder = "";


            // Enhanced mapping with more accurate translations and image folder assignments.
            switch (name_start) {
                case 'agenturen':
                    name_en = 'agencies & pr';
                    images_folder = 'agent';
                    break;
                case 'apps':
                    name_en = 'apps & platforms';
                    images_folder = 'apps';
                    break;
                case 'mobility':
                    name_en = 'mobility & automotive';
                    images_folder = 'auto';
                    break;
                case 'fashion':
                    name_en = 'fashion & accessories';
                    images_folder = 'fashion';
                    break;
                case 'einrichten':
                    name_en = 'home & household';
                    images_folder = 'home';
                    break;
                case 'health':
                    name_en = 'health & pharma';
                    images_folder = 'medi';
                    break;
                case 'retail':
                    name_en = 'retail & e-commerce';
                    images_folder = 'retail';
                    break;
                case 'spaß':
                    name_en = 'fun & games';
                    images_folder = 'spiel';
                    break;
                case 'sweets':
                    name_en = 'sweets & snacks';
                    images_folder = 'sweets';
                    break;
                case 'energie':
                    name_en = 'energy & technology';
                    images_folder = 'tech';
                    break;
                case 'organisationen':
                    name_en = 'organizations & associations';
                    images_folder = 'verein';
                    break;
                case 'beverages':
                    name_en = 'beverages & alcoholics';
                    images_folder = 'beverages';
                    break;
                case 'finance':
                    name_en = 'finance & insurance';
                    images_folder = 'finance';
                    break;
                case 'cosmetics':
                    name_en = 'cosmetics & care';
                    images_folder = 'cosmetics';
                    break;
                case 'medien':
                    name_en = 'media & publishers';
                    images_folder = 'verlage';
                    break;
                case 'food':
                    name_en = 'food & nutrition';
                    images_folder = 'food';
                    break;
                default:
                    name_en = name; // Fallback to original name if no translation
                    console.warn(`No translation found for: ${name}`);
            }


            return {
                name_de: name,
                name_en,
                images_folder,
            };
        });

        // Clear existing data and then insert.  Be VERY careful with this in production.
        await db.delete(customergroupsTable);
        await db.insert(customergroupsTable).values(customerGroupData);
        console.log('Customer groups seeded successfully!');

    } catch (error) {
        console.error('Error seeding customer groups:', error);
    } finally {
        process.exit();  // Ensure script exits after execution (or error)
    }
};

main();
