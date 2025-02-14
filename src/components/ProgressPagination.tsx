'use client'

import { useState } from "react";

export const ProgressPagination = ({ totalPages = 10 }) => {
    // State to store the current page (0-indexed)
    const [currentPage, setCurrentPage] = useState(0);

    // Basic calculations for the progress bar
    const progressPercent = ((currentPage + 1) / totalPages) * 100;

    const gotoNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const gotoPrev = () => {
        // If the current page is 0 then wrap to last page.
        setCurrentPage((prev) =>
            prev === 0 ? totalPages - 1 : prev - 1
        );
    };

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Progress Bar Container */}
            <PaginationButton text="<" onClick={gotoPrev} />
            <div className="w-full max-w-md bg-salongreen h-0.5">
                {/* Progress Bar Fill */}
                <div
                    className="bg-salongreen h-2"
                    style={{
                        width: `${progressPercent}%`,
                        transition: "width 0.3s ease"
                    }}
                />
            </div>

            <PaginationButton text=">" onClick={gotoNext} />
        </div>
    );
};

const PaginationButton = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="font-serif px-4 py-2 hover:scale-110 text-salongreen text-xl">
            {text}
        </button>
    );
}
