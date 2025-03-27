'use client'

import { PublicationCard } from "../app/[lang]/news-publikationen/PublicationCard"
import { useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

type Publication = {
    id: number,
    title: string,
    publishedAt: string,
    author: string,
    content: string,
    imagePath: string,
}

export function StackedPublications({ aktText, publications, lang }: { aktText: string, publications: Publication[], lang: "de" | "en" }) {
    const [pubIdx, setPubIdx] = useState(0)

    const handleForward = (pubIdx: number) => {
        setPubIdx((pubIdx + 1) % publications.length)
    }

    const handleBackward = (pubIdx: number) => {
        setPubIdx((pubIdx - 1 + publications.length) % publications.length)
    }

    return (
        <div className="flex mb-24">
            <div className="bg-zinc-200 w-[30%] h-96 p-10">
                <h2 className='font-bold font-serif text-xl md:text-4xl text-right'>{aktText}</h2>
                <div className="flex h-full pb-8 justify-center items-end gap-x-4 md:gap-x-10">
                    <button
                        className="flex justify-center items-center text-white rounded-bl-xl rounded-tr-xl w-16 h-10 text-xl bg-salongreen"
                        onClick={() => handleBackward(pubIdx)}
                    ><FaArrowLeft /></button>
                    <button
                        className="flex justify-center items-center text-white rounded-bl-xl rounded-tr-xl w-16 h-10 text-xl bg-salongreen"
                        onClick={() => handleForward(pubIdx)}
                    ><FaArrowRight /></button>
                </div>
            </div>

            <div className="relative w-[70%]">
                <div className="absolute inset-0 w-full z-[-2]">
                    <PublicationCard publication={publications[(pubIdx + 2) % publications.length]} lang={lang} />
                </div>
                <div className="absolute top-0 bottom-0 right-0 left-15 w-[90%] z-[-1]">
                    <PublicationCard publication={publications[(pubIdx + 1) % publications.length]} lang={lang} />
                </div>
                <div className="absolute top-0 bottom-0 right-0 left-30 z-[11] w-[80%]">
                    <PublicationCard publication={publications[pubIdx]} lang={lang} />
                </div>

                {/* Card count indicator */}
                {publications.length > 1 && (
                    <div className="absolute bottom-4 right-8 bg-salongreen text-white rounded-tr-xl rounded-bl-xl px-3 py-1 text-sm z-40">
                        {pubIdx + 1} / {publications.length}
                    </div>
                )}
            </div>
        </div>
    )
}
