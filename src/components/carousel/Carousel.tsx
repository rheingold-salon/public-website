'use client'

import { StaticImageData } from 'next/image';
import React, { ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card } from "@/components/carousel/Card"
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./CarouselArrowButtons";

interface CardItem {
    id: number;
    imageSrc: string | StaticImageData;
    imageAlt: string;
    content: ReactNode;
    aspectRatio?: string;
}

const TWEEN_FACTOR_BASE = 0.54

const numberWithinRange = (number: number, min: number, max: number) =>
    Math.min(Math.max(number, min), max)

export function Carousel({ cards }: { cards: CardItem[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [scrollProgress, setScrollProgress] = useState(0);
    const tweenFactor = useRef(0)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);


    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenOpacityScale = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'
            const apiScrollProgress = emblaApi.scrollProgress()
            const progress = Math.max(0, Math.min(1, apiScrollProgress))
            setScrollProgress(progress * 100)

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - apiScrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + apiScrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - apiScrollProgress)
                                }
                            }
                        })
                    }

                    const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
                    const opacity = numberWithinRange(tweenValue, 0, 1).toString()
                    const scale = numberWithinRange(tweenValue, 0.8, 1).toString()
                    emblaApi.slideNodes()[slideIndex].style.opacity = opacity
                    emblaApi.slideNodes()[slideIndex].style.transform = `scale(${scale})`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenFactor(emblaApi)
        tweenOpacityScale(emblaApi)
        emblaApi
            .on('reInit', setTweenFactor)
            .on('reInit', tweenOpacityScale)
            .on('scroll', tweenOpacityScale)
            .on('slideFocus', tweenOpacityScale)
    }, [emblaApi, tweenOpacityScale, setTweenFactor])

    return (
        <div className="embla mx-auto mb-24 h-full">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex items-stretch">
                    {cards.map((card) => (
                        <div key={card.id} className="embla__slide shrink-0 grow-0 basis-full md:basis-2/3 mr-10">
                            <Card
                                imageSrc={card.imageSrc}
                                imageAlt={card.imageAlt}
                                aspectRatio={card.aspectRatio}
                            >
                                {card.content}
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls mt-10 flex justify-between items-center">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                </div>
                <div className="embla__progress relative w-full mx-4 h-[0.1rem] bg-salongreen">
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
    )
}
