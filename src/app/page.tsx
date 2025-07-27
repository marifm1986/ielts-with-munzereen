import { Camera, Check, ChevronRight, Circle, CircleArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import React, { useRef, useState } from 'react';
import ProductClient from '@/components/ui/productClient';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch('https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en', {
    headers: {
      'X-TENMS-SOURCE-PLATFORM': 'web',
    },
    next: { revalidate: 60 },
  });

  const productData = await res.json();
  const seo = productData?.data?.seo || {};

  const title = seo.title || 'IELTS Course - Product Page';
  const description = seo.description || 'Explore the IELTS Course details and features.';

  const ogImage = seo.defaultMeta?.find((m: any) => m.value === 'og:image')?.content;
  const ogUrl = seo.defaultMeta?.find((m: any) => m.value === 'og:url')?.content;

  return {
    title,
    description,
    keywords: seo.keywords || [],
    openGraph: {
      title,
      description,
      url: ogUrl,
      images: ogImage ? [{ url: ogImage, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },

  };
}



export interface Data {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: [];
  checklist: {
    id?: string | number;
    text: string;
    icon: string;
    color: string;
    list_page_visibility: boolean;
  }[];
  seo: any;
  cta_text: { name: string };
  sections: any[];
}

export default async function Product() {
  const res = await fetch('https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en', {
    headers: {
      "X-TENMS-SOURCE-PLATFORM": "web"
    },
    next: { revalidate: 60 },
  });

  const productData = await res.json();
  const typedProductData = productData.data as Data;
  console.log(typedProductData)
  const heroStyle = {
    backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
    width: '100vw',
    height: "300px"
  };

  const instructor = typedProductData.sections.find((x: any) => x.type === "instructors");
  const features = typedProductData.sections.find((x: any) => x.type === "features");
  const pointers = typedProductData.sections.find((x: any) => x.type === "pointers");
  const feature_explanations = typedProductData.sections.find((x: any) => x.type === "feature_explanations");
  const courseDetails = typedProductData.sections.find((x: any) => x.type === "about");
  return (
    <main className="flex flex-col bg-gray-100">
      <div className="container flex max-md:flex-col text-black mx-auto p-6 gap-8 relative">
        <div className="main-content bg-gray-100 flex-2/3 flex flex-col gap-8  max-sm:order-2">
          <div className="hero-section flex flex-col gap-4">
            <h1 className="text-[21px] font-semibold md:text-4xl">{typedProductData.title}</h1>
            <a href="#" className='flex gap-1.5 max-sm:flex-col'>
              <Image src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png" loading='lazy' alt="Rating badge" width={100} height={100} />
              (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
            </a>
            <p className="" dangerouslySetInnerHTML={{ __html: typedProductData.description }} />
          </div>
          {/* Instructor */}
          {instructor && (
            <div className='instructor-wrapper flex flex-col gap-1 w-full'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">Course instructor</span>
              <Card className='instructor-card flex flex-row max-sm:flex-col gap-4 items-center border-red-500 w-full bg-white p-4 '>
                <div className="image-wrapper overflow-hidden">
                  <Image className="rounded-xl" loading='lazy' src={instructor.values[0]?.image} alt={instructor.values[0]?.name || "Instructor"} width={120} height={150} />
                </div>
                <div className="info-wrapper w-full">
                  <a className="flex text-2xl font-bold items-center text-red-500 gap-2" href='#'>{instructor.values[0]?.name}
                    <ChevronRight />
                  </a>
                  <p className="flex w-full" dangerouslySetInnerHTML={{ __html: instructor.values[0]?.description }} />
                </div>
              </Card>
            </div>
          )}

          {/* Features */}
          {features && (
            <div className='features-wrapper flex flex-col bg-white  gap-4 p-6 rounded-xl'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{features.name}</span>
              <section className='feature-wrapper grid grid-cols-2  gap-4 max-sm:grid-cols-1'>
                {features.values.map((x: any) => (
                  <div className="single-feature gap-4 flex" key={x.id}>
                    <div className="icon-wrapper">
                      <Image className='object-contain object-center min-w-8' loading='lazy' src={x.icon} alt="Feature icon" width={24} height={100} />
                    </div>
                    <div className="info-wrapper">
                      <span className="title text-xl font-bold">{x.title}</span>
                      <p>{x.subtitle}</p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
          {/* Pointers */}
          {pointers && (
            <div className='pointers bg-white flex flex-col p-4 rounded-2xl  '>
              <span className=" mb-4 text-xl font-semibold md:text-2xl">{pointers.name}</span>
              <section className='feature-wrapper grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
                {pointers.values.map((x: any) => (
                  <div className="single-feature flex items-start gap-4" key={x.id}>
                    <CircleArrowRight className='min-w-[18px] shrink-0 text-green-800' />
                    <p>{x.text}</p>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* Feature Explanations */}
          {feature_explanations && (
            <div className='feature flex flex-col p-4'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{feature_explanations.name}</span>
              <section className='feature-wrapper grid grid-cols-1 border divide-y divide-gray-300 border-gray-300 rounded-md p-2'>
                {feature_explanations.values.map((x: any) => (
                  <div className="flex items-center justify-between gap-4 p-4  max-sm:flex-col" key={x.id}>
                    <div className="info-wrapper flex flex-col gap-2">
                      <span className="title text-lg font-black">{x.title}</span>
                      {x.checklist.map((c: string, inx: number) => (
                        <span key={inx} className='flex items-center gap-4'>
                          <Check className='min-w-[18px] shrink-0' />
                          {c}</span>
                      ))}
                    </div>
                    <div className='mb-4 mx-left max-w-[350px] max-sm:w-full '>
                      <Image src={x.file_url} alt={x.title || "Feature"} loading='lazy' className='max-sm:w-full rounded-xl' width={200} height={250} />
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* Course Details */}

          {courseDetails && (
            <div className='p-4 flex flex-col gap-4'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{courseDetails.name}</span>
              <section className='feature-wrapper '>
                <Accordion type="single" collapsible>

                  {courseDetails.values.map((x: any) => (
                    <AccordionItem value="item-1" key={x.id}>
                      <AccordionTrigger className='cursor-pointer'>
                        <span dangerouslySetInnerHTML={{ __html: x.title }} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <span dangerouslySetInnerHTML={{ __html: x.description }} />
                      </AccordionContent>
                    </AccordionItem>

                    // <div className="single-feature flex flex-col gap-4 mb-4">
                    //   <span className="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: x.title }} />
                    //   <p className="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: x.description }} />
                    // </div>
                  ))}

                </Accordion>
              </section>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <div className="sidebar flex flex-col flex-1/3 max-sm:order-1">
          <ProductClient
            media={typedProductData.media}
            ctaText={typedProductData.cta_text?.name}
            checklist={typedProductData.checklist}
          />

        </div>
      </div>

    </main>
  );
}
