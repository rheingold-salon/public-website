'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getCustomerLogos(folder: string) {
    try {
        // Input validation
        if (!folder) {
            throw new Error('Folder parameter is required');
        }

        // Security check to prevent directory traversal
        if (folder.includes('..') || folder.includes('/')) {
            throw new Error('Invalid folder name');
        }

        const logosDir = path.join(process.cwd(), 'public', 'static', 'images', 'customers', folder, 'logos');

        // Check if directory exists
        try {
            await fs.access(logosDir);
        } catch {
            return { logos: [] };
        }

        // Get all files in the logos directory
        const files = await fs.readdir(logosDir);

        // Filter for image files
        const logoFiles = files.filter(file =>
            /\.(jpg|jpeg|png|svg|webp|gif)$/i.test(file)
        );

        return { logos: logoFiles };
    } catch (error) {
        console.error('Error fetching logos:', error);
        throw new Error(error instanceof Error ? error.message : 'Internal server error');
    }
}
