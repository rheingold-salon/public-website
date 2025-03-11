import { getDictionary } from '@/dictionaries';
import React from 'react';
import Markdown from 'react-markdown';

export default async function DatenschutzPage() {
    const datenschutz_md = (await getDictionary("de")).datenschutz

    return (
        <div className='p-28 mx-8'>
            <Markdown>
                {datenschutz_md}
            </Markdown>

        </div>
    );
}
