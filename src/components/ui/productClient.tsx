'use client';

import { CirclePlay } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Card } from './card';
import { Button } from './button';

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
    const [isPlayVideo, setPlayVideo] = useState<boolean>(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
        setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
    };
    console.log('selectedMedia', selectedMedia)
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
        <div className="sidebar flex flex-col flex-1/3 w-fit gap-4">
            <div className="video-trailer flex flex-col shadow-2xl rounded-2xl overflow-clip gap-2 relative">

                {selectedMedia?.resource_type == 'video' ? (
                    isPlayVideo ? (
                        <iframe
                            className='h-full min-h-[250px]'
                            height={400}
                            src={`https://www.youtube.com/embed/${selectedMedia?.resource_value}?autoplay=1`}
                            title="Course Trailer | IELTS Course by Munzereen Shahid"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className='relative thumbnail-wrapper' >
                            <CirclePlay onClick={() => setPlayVideo(true)} size={100} color="#d5b9b9" className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] opacity-80 hover:opacity-100 cursor-pointer z-5  text-2xl' />
                            <Image
                                className="w-full"
                                src={selectedMedia?.thumbnail_url || "/fallback.jpg"}
                                alt="Video thumbnail"
                                width={400}
                                height={400}
                                loading='lazy'

                            />
                        </div>
                    )



                ) : <Image
                    className='w-full'
                    src={selectedMedia?.thumbnail_url || "/fallback.jpg"}
                    alt="Video thumbnail"
                    width={400}
                    height={400}
                    loading='lazy'
                />}

                <div className="image-gallery flex gap-2 items-center overflow-x-auto h-[105px] scrollbar-hide cursor-grab active:cursor-grabbing"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {media.map((x, id) => (
                        x.thumbnail_url ? (
                            <Image
                                className={`flex-1 cursor-pointer thumbnail border-2 rounded-md ${selectedMedia == x ? 'active-thumbnail' : ''}`}
                                loading='lazy'
                                src={x?.thumbnail_url}
                                alt={x.thumbnail_url}
                                width={100}
                                height={100}
                                key={id}
                                onClick={() => { setSelectedMedia(x), setPlayVideo(false) }}
                            />
                        ) : null

                    ))}
                </div>
                <div className="amount-wrapper flex justify-between items-center text-t">
                    <span className="price text-3xl font-bold px-4 py-2"> <span className='text-md'>৳</span> 1,000.00</span>
                    <span className="price  px-4 py-2 line-through"> <span className='text-md'>৳</span> 3,500.00</span>
                </div>
                <Button className="cta bg-purple-800 m-4 rounded-lg hover:shadow-lg active:scale-[.95]">{ctaText} in Course</Button>
                <a href="#" className='flex gap-1.5 p-4 max-sm:flex-col'>
                    <Image src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png" loading='lazy' alt="Rating badge" className='flex flex-1/4' width={100} height={100} />
                    (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                </a>
            </div>
            <Card className='flex flex-col p-4 shadow-2xl z-10'>
                <span className="title font-black">এই কোর্সে যা থাকছে</span>
                <div className="check-list flex flex-col gap-2">
                    {checklist.map((check, index) =>
                        check.list_page_visibility ? (
                            <div className="single-check flex gap-2" key={check.id || index}>
                                <Image src={check.icon} alt={check.text} width={24} height={24} loading='lazy' />
                                <span className="text">{check.text}</span>
                            </div>
                        ) : null
                    )}
                </div>
            </Card>
        </div >
    );
}
