"use client"

import { useState } from 'react';
import { Modal } from "@/components"

export function QuantBox({ boxtext, modaltext }: { boxtext: string, modaltext: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="relative border-salongreen border-[5px] w-40 h-40 md:w-60 md:h-60 flex justify-center items-center hover:bg-salongreen hover:text-white transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <p className="text-center text-lg font-bold font-serif">{boxtext}</p>
            </div>
            {isModalOpen && (
                <Modal closeModal={() => setIsModalOpen(false)}>
                    <p className='text-sm md:text-lg font-bold m-4'>{modaltext}</p>
                </Modal>
            )}
        </>
    );
}
