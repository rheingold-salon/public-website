'use client'
import { PublicationCard } from "./PublicationCard"
import { useState, useEffect } from "react"

type Publication = {
    id: number,
    title: string,
    publishedAt: Date,
    author: string,
    content: string,
    imagePath: string,
    homePageSlider: boolean | null
}

type Tag = {
    id: number,
    name: string
}

type PublicationTag = {
    publicationId: number,
    tagId: number
}

export function PublicationsComposer({
    lang,
    publications,
    tags,
    publicationTags,
}: {
    lang: "de" | "en",
    publications: Publication[],
    tags: Tag[],
    publicationTags: PublicationTag[]
}) {
    const [selectedTag, setSelectedTag] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Sort tags alphabetically
    const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
    const tags1 = sortedTags.filter((tag) => tag.name.indexOf("&") === -1);
    const tags2 = sortedTags.filter((tag) => tag.name.indexOf("&") > -1);

    // Filter publications based on selected tag
    const filteredPublications = selectedTag === 0
        ? publications
        : publications.filter(publication =>
            publicationTags.some(pt =>
                pt.publicationId === publication.id && pt.tagId === selectedTag
            )
        );

    // Calculate pagination
    const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
    const paginatedPublications = filteredPublications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when changing filters
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTag]);

    const handleTagClick = (tagId: number) => {
        setSelectedTag(tagId);
    };

    // Handle page navigation
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    // Generate pagination buttons with ellipsis for many pages
    const renderPaginationButtons = () => {
        const siblingsCount = 1; // Number of siblings on each side of current page
        const boundaryCount = 1; // Number of boundary pages at the beginning and end

        // If we have 7 or fewer pages, just show all of them
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === page
                        ? 'bg-salongreen text-white'
                        : 'hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ));
        }

        const range = (start: number, end: number) => {
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        };

        // Calculate start and end points based on current page
        const startPages = range(1, boundaryCount);
        const endPages = range(totalPages - boundaryCount + 1, totalPages);

        const siblingStart = Math.max(
            boundaryCount + 1,
            currentPage - siblingsCount
        );
        const siblingEnd = Math.min(
            totalPages - boundaryCount,
            currentPage + siblingsCount
        );

        const showStartEllipsis = siblingStart > boundaryCount + 1;
        const showEndEllipsis = siblingEnd < totalPages - boundaryCount;

        const middleRange = range(siblingStart, siblingEnd);

        const items = [
            ...startPages,
            ...(showStartEllipsis ? ['ellipsis-start'] : []),
            ...middleRange,
            ...(showEndEllipsis ? ['ellipsis-end'] : []),
            ...endPages
        ];

        return items.map((item, index) => {
            if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                return (
                    <span key={`ellipsis-${index}`} className="px-4 py-2 mx-1">
                        &hellip;
                    </span>
                );
            }

            const page = item as number;
            return (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === page
                        ? 'bg-salongreen text-white'
                        : 'hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="flex flex-col md:flex-row m-4 md:m-8">
            {/* Tags section */}
            <div className="w-full md:w-[40%] mb-8 md:mb-0 md:mr-8">
                <div className="flex flex-col mb-8">
                    <button
                        key={0}
                        className="text-left font-serif font-bold text-zinc-400 text-xl mb-8 group transition-all ease-out"
                        onClick={() => handleTagClick(0)}
                    >
                        <span className="relative">
                            alle
                            <span className={`absolute left-0 top-[40%] h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                        ${selectedTag === 0 ? 'w-full' : 'w-0 group-hover:w-full'}`}
                            />
                        </span>
                    </button>
                    {tags1.map((tag) => (
                        <button
                            key={tag.id}
                            className="text-left font-serif font-bold text-zinc-400 text-xl mb-8 group transition-all ease-out"
                            onClick={() => handleTagClick(tag.id)}
                        >
                            <span className="relative">
                                {tag.name}
                                <span className={`absolute left-0 top-[40%] h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${selectedTag === tag.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                />
                            </span>
                        </button>
                    ))}
                </div>
                <div className="flex flex-col">
                    {tags2.map((tag) => (
                        <button
                            key={tag.id}
                            className="text-left font-serif font-bold text-zinc-400 text-xl mb-8 group transition-all ease-out"
                            onClick={() => handleTagClick(tag.id)}
                        >
                            <span className="relative">
                                {tag.name}
                                <span className={`absolute left-0 top-[40%] h-2 z-[-1] bg-salongreen transition-all duration-300 ease-out
                            ${selectedTag === tag.id ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                />
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Publications grid and pagination */}
            <div className="flex flex-col w-full md:w-[70%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {paginatedPublications.map((publication) => (
                        <PublicationCard key={publication.id} publication={publication} lang={lang} />
                    ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &laquo;
                        </button>

                        {renderPaginationButtons()}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &raquo;
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
