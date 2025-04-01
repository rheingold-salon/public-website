'use client'
import { FaClock, FaLocationPin, FaLink } from 'react-icons/fa6';
import Link from 'next/link';
import { env } from '@/env';

type EventCardProps = {
    event: {
        title: string,
        content: string,
        date: string,
        time: string,
        location: string,
        imagePath: string,
        externalLink: string,
    },
    month: string,
}

export const EventCard = ({ event, month }: EventCardProps) => {
    // Parse date for display
    const [year, , day] = event.date.split('-');

    return (
        <div
            className='relative mx-8 w-full overflow-hidden rounded-tr-3xl rounded-bl-3xl transition-all duration-500 transform h-[500px] md:h-[550px]'
        >
            {/* Background Image */}
            <div
                className='absolute inset-0 z-[-1] w-full h-full transition-transform duration-500'
                style={{
                    backgroundImage: `url(${env.NEXT_PUBLIC_IMAGE_SERVER_URL}/static/images/events/${event.imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Date Overlay */}
            <div className='absolute top-0 left-0 bg-salongreen text-white w-1/2 h-1/2 rounded-tr-3xl flex flex-col items-center justify-center transition-all duration-300'>
                <span className="text-4xl md:text-7xl font-serif font-bold">{day}.</span>
                <span className="text-sm md:text-lg font-serif">{month} {year}</span>
            </div>

            {/* Content Overlay */}
            <div
                className='absolute bottom-0 left-0 right-0 h-1/2 min-h-1/2 w-full bg-zinc-200 p-4 md:p-8 transition-all duration-300 rounded-tr-3xl'
            >
                <h1 className="font-bold font-serif text-xl md:text-3xl mb-4 md:mb-8 line-clamp-2">{event.title}</h1>
                <div className="flex flex-col items-start gap-y-2 md:gap-y-4">
                    <div className="flex items-center space-x-2 md:space-x-4 font-bold">
                        <FaClock className="text-lg md:text-2xl" />
                        <p className="text-lg md:text-2xl">{event.time.slice(0, 5)} Uhr</p>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4 font-bold">
                        <FaLocationPin className="text-lg md:text-2xl" />
                        <p className="text-sm md:text-lg">{event.location}</p>
                    </div>
                    <div className="max-h-24 md:max-h-32 overflow-y-auto">
                        <p className="text-sm md:text-lg">{event.content}</p>
                    </div>
                </div>

                {/* External link button */}
                {event.externalLink && (
                    <div className="flex justify-end">
                        <Link
                            href={event.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-flex items-center gap-2 bg-salongreen text-white py-2 px-4 rounded-tr-lg rounded-bl-lg
                                transition-all duration-300 hover:scale-105'
                        >
                            <FaLink />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
