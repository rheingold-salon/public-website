import { db } from ".";
import { customergroupsTable } from "./schema";

const main = async () => {
    try {
        const customerGroupData = [
            {
                nameDe: 'agenturen & pr',
                nameEn: 'agencies & pr',
                imagesFolder: 'agent'
            },
            {
                nameDe: 'apps & plattformen',
                nameEn: 'apps & platforms',
                imagesFolder: 'apps'
            },
            {
                nameDe: 'mobility & automotive',
                nameEn: 'mobility & automotive',
                imagesFolder: 'auto'
            },
            {
                nameDe: 'fashion & accessories',
                nameEn: 'fashion & accessories',
                imagesFolder: 'fashion'
            },
            {
                nameDe: 'einrichten & haushalt',
                nameEn: 'home & household',
                imagesFolder: 'home'
            },
            {
                nameDe: 'health & pharma',
                nameEn: 'health & pharma',
                imagesFolder: 'medi'
            },
            {
                nameDe: 'retail & e-coomerce',
                nameEn: 'retail & e-commerce',
                imagesFolder: 'retail'
            },
            {
                nameDe: 'spaß & spiel',
                nameEn: 'fun & games',
                imagesFolder: 'spiel'
            },
            {
                nameDe: 'sweets & snacks',
                nameEn: 'sweets & snacks',
                imagesFolder: 'sweets'
            },
            {
                nameDe: 'energie & technologie',
                nameEn: 'energy & technology',
                imagesFolder: 'tech'
            },
            {
                nameDe: 'organisationen & verbände',
                nameEn: 'organizations & associations',
                imagesFolder: 'verein'
            },
            {
                nameDe: 'beverages & alcoholics',
                nameEn: 'beverages & alcoholics',
                imagesFolder: 'beverages'
            },
            {
                nameDe: 'finance & insurance',
                nameEn: 'finance & insurance',
                imagesFolder: 'finance'
            },
            {
                nameDe: 'cosmetics & care',
                nameEn: 'cosmetics & care',
                imagesFolder: 'cosmetics'
            },
            {
                nameDe: 'medien & verlage',
                nameEn: 'media & publishers',
                imagesFolder: 'verlage'
            },
            {
                nameDe: 'food & nutrition',
                nameEn: 'food & nutrition',
                imagesFolder: 'food'
            }
        ];

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
