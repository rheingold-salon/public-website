"use client"
import Image from 'next/image';
import { teamImage } from '@/assets';
import { useState } from "react";
import { FaPlay } from 'react-icons/fa';

export const EmbeddedVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "fGnFUdJ7yjs";

    return (
        <div className="relative h-screen w-screen">
            {isPlaying ? (
                <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            ) : (
                <div
                    className="relative cursor-pointer h-full w-full"
                    onClick={() => setIsPlaying(true)}
                >
                    <Image
                        src={teamImage}
                        alt="Video thumbnail"
                        fill
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center'
                        }}
                    />
                    {/* Custom Play Button */}
                    <div className="bg-black bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center">
                        <div
                            className="w-20 bg-salongreen rounded-tr-lg rounded-bl-lg p-4 shadow-lg flex justify-center"
                        >
                            <FaPlay className='text-white' />
                        </div>
                        <p className="mt-8 text-white font-bold font-serif text-3xl">WER <span className='text-salongreen'>WIR</span> SIND</p>
                    </div>
                </div>
            )}
        </div>
    );
};

