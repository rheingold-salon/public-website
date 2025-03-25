import Image from 'next/image';
import { teamImage, comingSoonImage } from '@/assets'
import { db, peopleTable } from "@/server/db";
import { getDictionary } from '@/dictionaries';

type Person = {
    id: number;
    name: string;
    role: string;
    quote: string;
    about: string;
    imagePath: string | null;
}

export default async function GruenderTeamPage({ params }: { params: Promise<{ lang: "de" | "en" }> }) {
    const lang = (await params).lang;
    const dict = (await getDictionary(lang)).foundersTeamPage;

    const people: Person[] = (await db.select().from(peopleTable)).map((person) => ({
        id: person.id,
        name: person.name,
        role: lang === 'de' ? person.roleDe : person.roleEn,
        quote: lang === 'de' ? person.quoteDe : person.quoteEn,
        about: lang === 'de' ? person.aboutDe : person.aboutEn,
        imagePath: person.imagePath

    }));

    // Filter for founders (Inhaber)
    const founders = people?.filter((person) =>
        person.role.includes("Inhaber") || person.role.includes("Owner")
    );

    // Filter for team (not Inhaber)
    const team = people?.filter((person) =>
        !person.role.includes("Inhaber") && !person.role.includes("Owner")
    )


    return (
        <>
            <div className="pt-20 relative h-[75vh] md:h-screen w-full overflow-hidden">
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
                    <PeopleGrid title={dict.founders} people={founders} />
                    <PeopleGrid title={dict.team} people={team} />
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
                    const imageUrl = person.imagePath ? "/static/images/people/" + person.imagePath : comingSoonImage;
                    return (
                        <div key={person.id} className='flex flex-row items-start py-4'>
                            {isFirstColumn ? (
                                <>
                                    <div className="text-right flex flex-col max-w-52">
                                        <p className='text-salongreen font-bold text-4xl'>{firstName}</p>
                                        <p className='font-bold text-4xl'>{lastName}</p>
                                        <p className='mt-10 mr-10'>{person.role}</p>
                                        <p className='mt-4 mr-10'>{person.quote}</p>
                                        {person.about &&
                                            <>
                                                <p className='mt-4 font-bold mr-10'>Das sagen die KollegInnen</p>
                                                <p className='mr-10'>{person.about}</p>
                                            </>
                                        }
                                    </div>
                                    <div className="w-56 h-[32rem] relative">
                                        <Image
                                            src={imageUrl}
                                            alt={person.name}
                                            fill={true}
                                            sizes="100vw"
                                            style={{
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-56 h-[32rem] relative">
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
                                        <p className='mt-10 ml-10'>{person.role}</p>
                                        <p className='mt-4 ml-10 text-wrap'>{person.quote}</p>
                                        {person.about &&
                                            <>
                                                <p className='mt-4 ml-10 font-bold'>Das sagen die KollegInnen</p>
                                                <p className='ml-10'>{person.about}</p>
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
