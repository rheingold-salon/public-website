import Image, { StaticImageData } from 'next/image';

export const ImageWithTextBox = ({ text, staticImage }: { text: string, staticImage: StaticImageData }) => {
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
                <div className="ml-8 mr-8 mb-40 md:mr-40 bg-white/90 p-8 rounded-tr-xl rounded-bl-xl max-w-xl text-center">
                    <p className="text-xl md:text-4xl text-left font-bold text-black">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

