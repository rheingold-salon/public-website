import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export const ImageWithTextBox = ({ text, staticImage, link }: { text: string, staticImage: StaticImageData | string, link?: string }) => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={staticImage}
                    alt="Landing Page Background"
                    quality={100}
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                    priority
                    className='h-screen w-screen'
                />
            </div>

            {/* Text Overlay Container */}
            <div className="relative z-10 flex items-end justify-end h-full">
                <div className="relative ml-8 mr-8 mb-40 md:mr-40 bg-white p-8 rounded-tr-xl rounded-bl-xl max-w-xl text-center">
                    <p className="text-xl md:text-4xl text-left font-serif font-semibold text-black">
                        {text}
                    </p>
                    {link &&
                        <Link
                            className="absolute -bottom-6 -right-6 flex justify-center items-center text-white text-xl bg-salongreen rounded-tr-xl rounded-bl-xl w-16 h-10"
                            href={link}>
                            <FaArrowRight />
                        </Link>
                    }
                </div>

            </div>
        </div>
    );
};

