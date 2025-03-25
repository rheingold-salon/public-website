// File: app/api/customer-logos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const folder = searchParams.get('folder');

        if (!folder) {
            return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
        }

        // Security check to prevent directory traversal
        if (folder.includes('..') || folder.includes('/')) {
            return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
        }

        const logosDir = path.join(process.cwd(), 'public', 'static', 'images', 'customers', folder, 'logos');

        // Check if directory exists
        try {
            await fs.access(logosDir);
        } catch {
            return NextResponse.json({ logos: [] }, { status: 200 });
        }

        // Get all files in the logos directory
        const files = await fs.readdir(logosDir);

        // Filter for image files
        const logoFiles = files.filter(file =>
            /\.(jpg|jpeg|png|svg|webp|gif)$/i.test(file)
        );

        return NextResponse.json({ logos: logoFiles }, { status: 200 });

    } catch (error) {
        console.error('Error fetching logos:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
