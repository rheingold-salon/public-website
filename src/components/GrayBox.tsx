export function GrayBox({ heading1, heading2, text }: { heading1: string, heading2: string, text: string }) {
    return (
        <div className="relative my-24">
            {/* Gray background box */}
            <div className="absolute left-0 top-0 h-full w-64 bg-zinc-200 z-[-1]" />

            {/* Content container */}
            <div className="pl-64 py-10">
                {/* Headings with negative margin to overlap the gray box */}
                <div className="-ml-16">
                    <p className="font-semibold font-serif text-4xl">{heading1} &amp;</p>
                    <p className="font-semibold font-serif text-4xl text-salongreen">{heading2}</p>
                </div>

                {/* Text content stays in normal position */}
                <p className="m-8 font-bold text-lg">{text}</p>
            </div>
        </div>
    );
};
