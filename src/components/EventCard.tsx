import Image from 'next/image'
import { FaArrowRightLong } from 'react-icons/fa6';

type Event = {
    title: string,
    content: string,
    date: string,
    time: string,
    location: string,
    imagePath: string,
    externalLink: string,
}

export const EventCard = ({ event, months }: { event: Event, months: string[] }) => {
    const [year, month_idx, day] = event.date.split("-");
    const month = months[parseInt(month_idx)];
    return (
        <div className='m-8 relative'>
            <div className="flex rounded-tr-3xl rounded-bl-3xl overflow-hidden relative">
                <div className="w-full md:w-1/2 relative">
                    <Image
                        src={`/static/images/events/${event.imagePath}`}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0"
                    />
                    <div className="absolute inset-y-0 left-0 w-1/2 font-bold bg-salongreen rounded-tr-3xl font-serif flex flex-col items-center justify-center text-white">
                        <p className="text-7xl underline underline-offset-8 decoration-2">{day}.</p>
                        <p className='text-lg'>{month} {year}</p>
                    </div>
                </div>
                <div className='w-1/2 bg-zinc-200 p-8'>
                    <h1 className='font-bold font-serif text-3xl'>{event.title}</h1>
                    <div className='flex flex-col items-start md:flex-row md:items-end gap-x-32'>
                        <div className='flex flex-col whitespace-nowrap'>
                            <p className='text-3xl'>{event.time.slice(0, 5)} Uhr</p>
                            <p className='text-lg'>{event.location}</p>
                        </div>
                        <p className='text-lg'>{event.content}</p>
                    </div>
                </div>
            </div>
            <a href={event.externalLink} target="_blank" rel="noopener noreferrer" className="absolute -bottom-7 -right-8">
                <button className='bg-salongreen w-16 h-14 flex items-center justify-center rounded-tr-3xl rounded-bl-3xl'>
                    <FaArrowRightLong className='text-white' />
                </button>
            </a>
        </div>
    )
}

