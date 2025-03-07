'use client'

import React, { useState } from 'react';
import { Modal } from '@/components';

// Types for our Hexagon component
type HexagonPoint = {
    label: string;
    content: React.ReactNode;
    position: {
        x: number;
        y: number;
    };
};

type HexagonProps = {
    size?: number;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    points: HexagonPoint[];
};

export const Hexagon: React.FC<HexagonProps> = ({
    size = 150,
    fillColor = '#ffffff',
    strokeColor = '#c0dc04',
    strokeWidth = 4,
    points,
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };


    // Calculate hexagon points
    const centerX = size;
    const centerY = size;
    const radius = size * 0.8;

    // Create hexagon path
    const hexPoints = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        hexPoints.push(`${x},${y}`);
    }
    const hexPath = hexPoints.join(' ');

    // Calculate positions for text (slightly outside the hexagon)
    const textRadius = radius * 1.6;
    const textPositions = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = centerX + textRadius * Math.cos(angle);
        const y = centerY + textRadius * Math.sin(angle);
        textPositions.push({ x, y });
    }

    return (
        <div className="relative" style={{ width: size * 2, height: size * 2 }}>
            <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`}>
                <polygon
                    points={hexPath}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                />
            </svg>

            {/* Text elements positioned around the hexagon */}
            {points.map((point, index) => {
                // Ensure we don't exceed the number of positions
                if (index >= textPositions.length) return null;

                const position = textPositions[index];

                return (
                    <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
                      font-bold hover:scale-105 transition-all duration-200 text-center ease-in-out"
                        style={{
                            left: position.x,
                            top: position.y,
                        }}
                        onClick={() => openModal(point.content)}
                    >
                        {point.label}
                    </div>
                );
            })}

            {/* Modal component */}
            {isModalOpen && <Modal closeModal={closeModal}>
                {modalContent}
            </Modal>
            }
        </div>
    );
};
