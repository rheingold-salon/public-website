"use client"

import Image from 'next/image';
import { useState } from 'react';

// CustomerGroupType
type CustomerGroup = {
    id: number,
    name_de: string,
    name_en: string,
    images_folder: string,
}

export function CustomerGroupCell({ customerGroup }: { customerGroup: CustomerGroup }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className="relative group h-60 overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Image
                    src={`/static/images/customers/${customerGroup.images_folder}/kategorien_${customerGroup.images_folder}.jpg`}
                    alt={customerGroup.name_de}
                    layout="fill"
                    objectFit="cover"
                    className="z-[-1] transition-transform duration-500 saturate-150 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center hover:bg-opacity-0 transition-all duration-500">
                    <span className="text-black font-bold text-xl">
                        {customerGroup.name_de}
                    </span>
                </div>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-50'
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white p-8 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className='text-xl font-bold mb-4'>{customerGroup.name_de}</h2>
                    </div>
                </div>
            )}
        </>
    );
}
