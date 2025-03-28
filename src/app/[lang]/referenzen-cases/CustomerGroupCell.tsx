"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Modal } from "@/components";
import { getCustomerLogos } from '@/server/images/actions';

// CustomerGroupType
type CustomerGroup = {
    name: string,
    imagesFolder: string,
}

export function CustomerGroupCell({ customerGroup }: { customerGroup: CustomerGroup }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logos, setLogos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Only fetch logos when modal is opened to save resources
        if (isModalOpen) {
            setIsLoading(true);
            getCustomerLogos(customerGroup.imagesFolder)
                .then(data => {
                    setLogos(data.logos || []);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error loading logos:", error);
                    setLogos([]);
                    setIsLoading(false);
                });
        }
    }, [isModalOpen, customerGroup.imagesFolder]);

    return (
        <>
            <div
                className="relative group h-60 overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Image
                    src={`/static/images/customers/${customerGroup.imagesFolder}/kategorien_${customerGroup.imagesFolder}.jpg`}
                    alt={customerGroup.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{
                        objectFit: "cover"
                    }}
                    className="z-[-1] transition-transform duration-500 saturate-150 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center hover:bg-opacity-0 transition-all duration-500">
                    <span className="font-bold text-xl">
                        {customerGroup.name}
                    </span>
                </div>
            </div>
            {isModalOpen && (
                <Modal closeModal={() => setIsModalOpen(false)}>
                    <h2 className='text-xl font-bold mb-4'>{customerGroup.name}</h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-salongreen"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-6 gap-4">
                            {logos.length > 0 ? (
                                logos.map((logo, index) => (
                                    <div key={index} className="p-2 bg-white rounded shadow flex items-center justify-center h-16 sm:h-20 md:h-24">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={`/static/images/customers/${customerGroup.imagesFolder}/logos/${logo}`}
                                                alt={`${customerGroup.name} customer logo`}
                                                fill
                                                sizes="(max-width: 640px) 50px, (max-width: 768px) 70px, 100px"
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-4 text-center text-gray-500">No customer logos available</p>
                            )}
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}
