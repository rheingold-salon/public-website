'use client'

import { StaticImageData } from "next/image";
import { ImageWithTextBox } from "./ImageWithTextBox";
import { Pagination } from "./Pagination"
import { useState } from "react";

type Publication = {
    id: number,
    title: string,
    imagePath: string,
    content: string
}

export function HomeSlider({ landingText, landingImage, sliderPublications, lang }: { lang: "de" | "en", landingText: string, landingImage: StaticImageData, sliderPublications: Publication[] }) {
    const [sliderIdx, setSliderIdx] = useState(1)

    return (
        <div className="relative">
            {sliderIdx === 1 ?
                (<ImageWithTextBox staticImage={landingImage} text={landingText} />)
                :
                (<ImageWithTextBox
                    staticImage={`/static/images/publications/${sliderPublications[sliderIdx - 2].imagePath}`}
                    text={sliderPublications[sliderIdx - 2].title}
                    link={`/${lang}/news-publikationen/${sliderPublications[sliderIdx - 2].id}`}
                />)
            }

            <div className="absolute bottom-0 top-[85%] left-0 right-0 z-[10]">
                <Pagination
                    totalPages={sliderPublications.length + 1}
                    onPageChange={setSliderIdx}
                />
            </div>

        </div>
    );
}
