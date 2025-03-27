'use client'

import { StaticImageData } from "next/image";
import { ImageWithTextBox } from "../ImageWithTextBox";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselArrowButtons";
import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { EmblaCarouselType } from "embla-carousel";

type Publication = {
    id: number,
    title: string,
    imagePath: string,
    content: string,
    sliderImagePath: string | null,
    sliderText: string | null
}

export function HomeSlider({ landingText, landingImage, sliderPublications, lang }: { lang: "de" | "en", landingText: string, landingImage: StaticImageData, sliderPublications: Publication[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [AutoPlay()]);
    const [scrollProgress, setScrollProgress] = useState(0);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
        setScrollProgress(progress * 100)
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onScroll(emblaApi)

        emblaApi
            .on('reInit', onScroll)
            .on('scroll', onScroll)
            .on('slideFocus', onScroll)
    }, [emblaApi, onScroll])

    return (
        <div className="relative embla h-screen w-screen">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    <div className="embla__slide shrink-0 grow-0 basis-full">
                        <ImageWithTextBox staticImage={landingImage} text={landingText} />

                    </div>
                    {sliderPublications.map((publication, idx) => (
                        <div className="embla__slide shrink-0 grow-0 basis-full" key={idx}>
                            <ImageWithTextBox
                                staticImage={`/static/images/publications/${publication.sliderImagePath ?? publication.imagePath}`}
                                text={publication.sliderText ?? publication.title}
                                link={`/${lang}/news-publikationen/${publication.id}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="embla__controls mt-10 absolute bottom-0 top-[85%] left-0 right- z-[10] flex justify-center items-center w-full">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    </div>
                    <div className="embla__progress relative w-[80%] h-[0.1rem] bg-salongreen">
                        <div
                            className="embla__progress__bar absolute inset-0 -top-[0.1rem] h-[0.3rem] bg-salongreen"
                            style={{ width: `${scrollProgress}%` }}
                        >
                        </div>
                    </div>
                    <div>
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                </div>
            </div>
        </div>
    );
}
