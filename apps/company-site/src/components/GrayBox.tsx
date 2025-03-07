import Image, { StaticImageData } from "next/image";

export function GrayBox({ heading1, heading2, image, children }: { heading1: string, heading2: string, image?: StaticImageData, children: React.ReactNode }) {
    return (
        <div className="relative my-24">
            {/* Gray background box */}
            <div className="absolute left-0 top-0 h-full w-32 md:w-64 bg-zinc-200 z-[-1]" />
            {image && <Image
                className="absolute bottom-0 left-0 h-1/2 w-32 md:w-64 rounded-tr-[100px]"
                src={image}
                alt="Grey Box Image"
                style={{
                    objectFit: "cover"
                }}
            />}

            {/* Content container */}
            <div className="pl-32 md:pl-64 pt-10">
                {/* Headings with negative margin to overlap the gray box */}
                <div className="-ml-16 md:-ml-32">
                    <p className="font-semibold font-serif text-4xl">{heading1}</p>
                    <p className="font-semibold font-serif text-4xl text-salongreen">{heading2}</p>
                </div>
                <div className="px-10 pt-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
