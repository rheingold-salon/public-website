import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
    imageSrc: string | StaticImageData;
    imageAlt: string;
    aspectRatio?: string;
    imageHeight?: number;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    imageSrc,
    imageAlt,
    aspectRatio = '4/3',
    children,
}) => {
    return (
        <div className="hover:scale-105 overflow-hidden rounded-tr-3xl rounded-bl-3xl shadow-md bg-white hover:shadow-lg transition-all duration-300 ease-in-out h-full">
            <div
                className="relative max-h-64 mx-auto"
                style={{
                    aspectRatio,
                }}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-4 border-t-2 border-salongreen">
                {children}
            </div>
        </div>
    );
};
