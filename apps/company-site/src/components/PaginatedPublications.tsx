'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Pagination } from './Pagination';
import { PublicationCard } from './PublicationCard';

interface CardItem {
    id: number;
    title: string;
    imagePath: string;
    content: string;
}

interface PaginatedCardsProps {
    cards: CardItem[];
    lang: "de" | "en";
    cardsPerPage?: number;
}

export const PaginatedPublications: React.FC<PaginatedCardsProps> = ({
    cards,
    lang,
    cardsPerPage = 3,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleCards, setVisibleCards] = useState<CardItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate total pages
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // Handle page change with animations
    const handlePageChange = (newPage: number) => {
        if (newPage !== currentPage) {
            // Start transition
            setIsTransitioning(true);

            // After fade out, update the page and cards
            setTimeout(() => {
                setCurrentPage(newPage);
                const indexOfLastCard = newPage * cardsPerPage;
                const indexOfFirstCard = indexOfLastCard - cardsPerPage;
                setVisibleCards(cards.slice(indexOfFirstCard, indexOfLastCard));

                // After updating, fade back in
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 50);
            }, 300); // This timing should match the CSS transition duration
        }
    };

    // Initialize visible cards
    useEffect(() => {
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        setVisibleCards(cards.slice(indexOfFirstCard, indexOfLastCard));
    }, [cards, cardsPerPage, currentPage]);

    return (
        <div ref={containerRef}>
            <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {visibleCards.map((card) => (
                    <PublicationCard key={card.id} publication={card} lang={lang} />
                ))}

            </div>

            <Pagination
                totalPages={totalPages}
                initialPage={1}
                onPageChange={handlePageChange}
                containerRef={containerRef}
            />
        </div>
    );
};

