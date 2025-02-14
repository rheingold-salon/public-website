import Image from 'next/image';
import { teamImage, comingSoonImage } from '@/assets'
import { db } from '@/db'
import { peopleTable } from '@/db/schema';

type Person = {
    id: number;
    name: string;
    role_de: string;
    role_en: string;
    quote_de: string;
    quote_en: string;
    about_de: string;
    about_en: string;
    image_path: string | null;
}

export default async function GruenderTeamPage() {
    const people: Person[] = await db.select().from(peopleTable);

    // Filter for founders (Inhaber)
    const founders = people?.filter((person) =>
        person.role_de?.includes("Inhaber")
    );

    // Filter for team (not Inhaber)
    const team = people?.filter((person) =>
        !person.role_de?.includes("Inhaber")
    )


    return (
        <>
            <div className="pt-20 relative h-[40vh] md:h-screen w-full overflow-hidden">
                <div className="absolute">
                    <Image
                        src={teamImage}
                        alt="Das rheingold salon team"
                        style={{
                            objectFit: 'contain',
                            objectPosition: 'center'
                        }}
                        priority
                    />
                </div>
            </div>
            {team && founders &&
                <div className='flex flex-col items-center justify-center'>
                    <PeopleGrid title="GRÜNDER" people={founders} />
                    <PeopleGrid title="TEAM" people={team} />
                    <div className='my-20'></div>

                </div>
            }
        </>
    );
}

const PeopleGrid = ({ title, people }: { title: string, people: Person[] }) => {
    return (
        <>
            <h1 className='text-zinc-300 text-7xl md:text-9xl max-w-screen'>{title}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-0'>
                {people?.map((person, index) => {
                    const [firstName, lastName] = person.name.split(" ");
                    const isFirstColumn = index % 2 === 0;
                    const imageUrl = person.image_path ?? comingSoonImage;
                    return (
                        <div key={person.id} className='flex flex-row items-start py-4'>
                            {isFirstColumn ? (
                                <>
                                    <div className="text-right flex flex-col max-w-52">
                                        <p className='text-salongreen font-bold text-4xl'>{firstName}</p>
                                        <p className='font-bold text-4xl'>{lastName}</p>
                                        <p className='mt-10'>{person.role_de}</p>
                                        <p className='mt-4'>{person.quote_de}</p>
                                        <p className='mt-4 font-bold'>Das sagen die KollegInnen</p>
                                        <p className=''>{person.about_de}</p>
                                    </div>
                                    <div className="flex-shrink-0 w-48 h-[32rem] relative">
                                        <Image
                                            src={imageUrl}
                                            alt={person.name}
                                            fill={true}
                                            sizes="(max-width: 1200px) 100vw"
                                            style={{
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-shrink-0 w-48 h-[32rem] relative">
                                        <Image
                                            src={imageUrl}
                                            alt={person.name}
                                            fill={true}
                                            sizes="(max-width: 1200px) 100vw"
                                            style={{
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col max-w-52">
                                        <p className='text-salongreen font-bold text-3xl'>{firstName}</p>
                                        <p className='font-bold text-3xl'>{lastName}</p>
                                        <p className='mt-10'>{person.role}</p>
                                        <p className='mt-4 text-wrap'>{person.quote}</p>
                                        {person.quote &&
                                            <>
                                                <p className='mt-4 font-bold'>Das sagen die KollegInnen</p>
                                                <p>{person.about}</p>
                                            </>
                                        }
                                    </div>
                                </>
                            )
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}
