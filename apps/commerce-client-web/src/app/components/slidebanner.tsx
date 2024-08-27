'use client';

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";

type Image = {
    src: string;
    alt: string;
};

const SliderBanner: React.FC<{ images: Image[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return (
        <div className="relative w-full max-w-screen-lg mx-auto overflow-hidden">
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="flex-none w-full" key={index}>
                        <img src={image.src} alt={image.alt} className="w-full h-auto" />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <Button
                    onClick={prevSlide}
                    className="px-4 py-2 bg-primary text-white rounded-md"
                >
                    Prev
                </Button>
                <Button
                    onClick={nextSlide}
                    className="px-4 py-2 bg-primary text-white rounded-md"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SliderBanner;
