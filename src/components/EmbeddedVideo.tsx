"use client"
import Image from 'next/image';
import { teamImage } from '@/assets';
import { useState } from "react";
import { FaPlay } from 'react-icons/fa';

export const EmbeddedVideo = ({ text }: { text: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "fGnFUdJ7yjs";

    const [who, we, are] = text.split(" ")


    return (
        <div className="relative h-96 md:h-screen md:w-screen">
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
                        <p className="mt-8 text-white font-bold font-serif text-3xl">{who} <span className='text-salongreen'>{we}</span> {are}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

