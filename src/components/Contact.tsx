import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";

export function Contact({ headerText, personalText, dontClickText, whyDidIClickText }: { headerText: string, personalText: string, dontClickText: string, whyDidIClickText: string }) {
    return (
        <div className="my-28 flex justify-around">
            <div className="flex flex-col">
                <Image
                    src="/Logo_Text_Black.png"
                    width={360}
                    height={180}
                    alt="Rheingold Salon Logo"
                    className="object-contain"
                />
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-32">
                    <div>
                        <h1 className="text-5xl font-bold">{headerText}</h1>
                        <p className="text-xl font-bold mt-10">{personalText}</p>
                        <p className="text-xl mt-5">ines imdahl</p>
                        <Link href="mailto:imdahl@rheingold-salon.de"><p className="text-xl">imdahl@rheingold-salon.de</p></Link>
                        <div className="flex space-x-1">
                            <Link href="#"><FaLinkedin style={{ color: "black" }} className="w-7 h-7 rounded-lg" /></Link>
                            <Link href="#"><FaInstagramSquare style={{ color: "black" }} className=" w-7 h-7 rounded-lg" /></Link>
                        </div>
                        <p className="text-xl mt-5">jens lönneker</p>
                        <Link href="mailto:imdahl@rheingold-salon.de"><p className="text-xl">loenneker@rheingold-salon.de</p></Link>
                        <div className="flex space-x-1">
                            <Link href="#"><FaLinkedin style={{ color: "black" }} className="w-7 h-7 rounded-lg" /></Link>
                            <Link href="#"><FaInstagramSquare style={{ color: "black" }} className=" w-7 h-7 rounded-lg" /></Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-bold">lönneker & imdahl</p>
                        <p className="text-xl font-bold">rheingold-salon GmbH & Co KG</p>
                        <p className="text-xl font-bold mt-10">rheingold-salon</p>
                        <p className="text-xl">Hohe Straße 160-168</p>
                        <p className="text-xl">50667 Köln</p>
                        <p className="text-xl">0221-86006-0</p>
                        <p className="text-xl">hello@rheingold-salon</p>
                    </div>
                </div>
            </div>

            <Link href={"mailto:hello@rheingold-salon.de?subject=" + whyDidIClickText}
                className="relative font-stretch-expanded font-bold [writing-mode:vertical-lr]"
            >
                <span className="relative [writing-mode:vertical-lr] h-full font-bold tex-xl">{dontClickText}
                    <span className="absolute top-0 right-1/3 h-full z-[-1] bg-salongreen w-2"></span>
                </span>
            </Link>


        </div>


    );

}
