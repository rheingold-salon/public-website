import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


type Publication = {
    id: number,
    title: string,
    imagePath: string,
    content: string
}

export function PublicationCard({ publication, lang }: { publication: Publication, lang: 'de' | 'en' }) {
    return (
        <div key={publication.id}
            className="relative group h-96 overflow-hidden shadow-lg cursor-pointer"
        >
            <Image
                src={`/static/images/publications/${publication.imagePath}`}
                alt={publication.title}
                quality={100}
                fill
                sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
                className='absolute inset-0 w-full'
            />

            {/* Text Overlay Container */}
            <div className="relative z-10 flex items-center justify-center m-8 h-full">
                <div className="relative flex bg-white p-4 rounded-tr-xl rounded-bl-xl max-w-sm md:max-w-xl">
                    <h1 className="font-bold md:inline text-left text-black">
                        {publication.title}
                    </h1>
                    <Link href={`/${lang}/news-publikationen/${publication.id}`}
                        className="absolute -bottom-6 -right-6 flex justify-center h-10 w-16 items-center bg-salongreen text-white rounded-tr-lg rounded-bl-lg text-lg">
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
