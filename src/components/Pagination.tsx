'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
    totalPages: number;
    initialPage?: number;
    onPageChange?: (page: number) => void;
    containerRef?: React.RefObject<HTMLElement | null>; // Reference to the container to scroll to
}

export const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    initialPage = 1,
    onPageChange,
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange?.(newPage);
        }
    };

    // Calculate progress percentage
    const progress = (currentPage / totalPages) * 100;

    // Apply smooth transition to progress bar
    useEffect(() => {
        if (progressBarRef.current) {
            progressBarRef.current.style.transition = 'width 0.4s ease-in-out';
            progressBarRef.current.style.width = `${progress}%`;
        }
    }, [progress]);

    return (
        <div className="flex items-center justify-between w-full mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-salongreen'
                    }`}
                aria-label="Previous page"
            >
                <FaChevronLeft size={24} />
            </button>

            <div className="relative w-full mx-4 h-[0.1rem] bg-salongreen">
                <div
                    ref={progressBarRef}
                    className="absolute inset-0 -top-[0.1rem] h-[0.3rem] bg-salongreen"
                    style={{ width: `${progress}%` }}
                >
                </div>

                {/* Page indicator */}
                <span className="text-salongreen absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                    {currentPage} / {totalPages}
                </span>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-salongreen'
                    }`}
                aria-label="Next page"
            >
                <FaChevronRight size={24} />
            </button>
        </div>
    );
};
