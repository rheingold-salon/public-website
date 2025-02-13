export default function DatesEventsPage() {
    const months_de = ["JAN.", "FEB.", "MÄR.", "APR.", "MAI.", "JUN.", "JUL.", "AUG.", "SEP.", "OKT.", "NOV.", "DEZ."];
    const months_en = ["JAN.", "FEB.", "MAR.", "APR.", "MAY.", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."];
    const months = months_de;

    return (
        <>
            <div className="pt-28 flex justify-around">
                <button className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Events
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </button>
                <button className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Vorträge
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </button>
                <button className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">Podcasts
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </button>
                <button className="text-zinc-400 font-bold text-6xl group hover:text-black transition-all ease-out">
                    <span className="relative">TV
                        <span className={`absolute left-0 top-1/3 w-0 h-4 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                    </span>
                </button>
            </div>
            <div className="mt-8 bg-zinc-200 h-screen w-96 flex flex-col items-end">
                <p className="font-serif text-5xl font-semibold mt-20 mr-8">high</p>
                <p className="font-serif text-5xl font-semibold mt-2 mr-8">& light</p>
            </div>
            <div className="my-8 flex justify-around">
                {months.map(month => (
                    <p key={month} className="hover:cursor-pointer text-2xl font-semibold text-zinc-400 group hover:text-black transition-all ease-out">
                        <span className="relative">{month}
                            <span className={`absolute left-0 top-1/3 w-0 h-2 z-[-1] bg-salongreen group-hover:w-full transition-all duration-300 ease-out`}></span>
                        </span>
                    </p>
                ))}
            </div>
        </>
    );
}
