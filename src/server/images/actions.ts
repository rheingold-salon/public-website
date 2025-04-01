'use server';

import { env } from "@/env";

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

        const baseUrl = `${env.NEXT_PUBLIC_IMAGE_SERVER_URL}/static/images`;
        const logosUrl = `${baseUrl}/customers/${folder}/logos`;

        // Fetch directory listing from the Caddy server
        const response = await fetch(logosUrl);

        console.log("this is the html: ", response)

        if (!response.ok) {
            // If directory doesn't exist or there's another error
            if (response.status === 404) {
                return { logos: [] };
            }
            throw new Error(`Failed to fetch logos: ${response.statusText}`);
        }

        // Parse the HTML response to extract file names
        const html = await response.text();



        // Extract image files from directory listing
        // This regex matches file names with image extensions
        const imageRegex = /href="([^"]+\.(jpg|jpeg|png|svg|webp|gif))"/gi;
        const matches = [...html.matchAll(imageRegex)];

        // Extract just the filenames from the matches
        const logoFiles = matches.map(match => {
            // Get the filename from the full path
            const fullPath = match[1];
            return fullPath.split('/').pop() || '';
        }).filter(Boolean); // Remove any empty strings

        return { logos: logoFiles };
    } catch (error) {
        console.error('Error fetching logos:', error);
        throw new Error(error instanceof Error ? error.message : 'Internal server error');
    }
}
