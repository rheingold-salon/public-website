export function GrayBox({ heading1, heading2, text }: { heading1: string, heading2: string, text: string }) {
    return (
        <div className="relative flex h-[38rem] md:h-96 my-24 items-end w-screen">
            <div className="bg-zinc-200 h-full w-1/6 md:w-1/4 z-[-1] text-right">
                <p className="absolute left-[10%] md:left-[18%] top-[10%] md:top[18%] font-semibold font-serif text-4xl">{heading1} &amp; </p>
                <p className="absolute left-[10%] md:left-[18%] top-[17%] md:top-[21%] font-semibold font-serif text-4xl text-salongreen">{heading2}</p>
            </div>
            <div className="mx-8 w-4/5 md:w-3/5">
                <p className="text-md md:text-lg font-bold">{text}</p>
            </div>
        </div>
    );
};
