'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Media {
    name: string;
    resource_type: string;
    resource_value?: string;
    thumbnail_url: string;
}

interface Props {
    media: Media[];
    ctaText: string;
    checklist: {
        id?: string | number;
        text: string;
        icon: string;
        color: string;
        list_page_visibility: boolean;
    }[];
}



export default function ProductClient({ media, ctaText, checklist }: Props) {
    const [selectedMedia, setSelectedMedia] = useState<Media>(media[0]);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
        setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // drag speed multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="sidebar flex flex-col flex-1/3 sticky w-[25rem] top-0">
            <div className="video-trailer flex flex-col shadow-2xl rounded-2xl overflow-clip gap-4">


                {selectedMedia?.resource_type == 'video' ? (
                    <iframe
                        className='w-full h-full'

                        src={`https://www.youtube.com/embed/${selectedMedia?.resource_value}`}
                        title="Course Trailer | IELTS Course by Munzereen Shahid"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>

                ) : <Image
                    className='w-full'
                    src={selectedMedia?.thumbnail_url || "/fallback.jpg"}
                    alt="Video thumbnail"
                    width={400}
                    height={400}
                    loading='lazy'
                />}

                <div className="image-gallery flex gap-4 items-center overflow-x-auto h-[200px] scrollbar-hide cursor-grab active:cursor-grabbing"

                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}

                >
                    {media.map((x, id) => (
                        x.thumbnail_url ? (
                            <Image
                                className='flex-1 cursor-pointer border-2 rounded-md'
                                loading='lazy'
                                src={x?.thumbnail_url}
                                alt={x.thumbnail_url}
                                width={100}
                                height={100}
                                key={id}
                                onClick={() => setSelectedMedia(x)}
                            />
                        ) : null

                    ))}
                </div>
                <span className="price text-3xl font-bold p-4">৳1,000</span>
                <button className="cta bg-green-600 text-white p-4">{ctaText}</button>
            </div>

            <span className="title mt-6">এই কোর্সে যা থাকছে</span>
            <div className="check-list flex flex-col gap-2">
                {checklist.map((check, index) =>
                    check.list_page_visibility ? (
                        <div className="single-check flex gap-2" key={check.id || index} style={{ color: check.color }}>
                            <Image src={check.icon} alt={check.text} width={24} height={24} loading='lazy' />
                            <span className="text">{check.text}</span>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
