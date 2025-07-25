import { Metadata } from 'next';
import Image from 'next/image';
export const metadata: Metadata = {
    title: 'IELTS Course - Product Page',
    description: 'Explore the IELTS Course product details, description, and media.',
};
export default async function Product() {
    const res = await fetch('https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en', {
        headers: {
            "X-TENMS-SOURCE-PLATFORM": "web"
        }
    });
    const productData = await res.json();
    const heroStyle = {
        backgroundImage: `url("https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg")`,
        width: '100vw',
        height: "300px"
    }
    type Section = {
        type: string;
        name: string;
        values: any[];
    };

    type Instructor = {
        image: string;
        type: string;
        name: string;
        description: string;
    };

    type Feature = {
        id: string | number;
        icon: string;
        type: string;
        title: string;
        subtitle: string;
    };

    type Pointer = {
        id: string | number;
        text: string;
        type: string;


    };

    type FeatureExplanation = {
        id: string | number;
        title: string;
        checklist: string[];
        file_url: string;
    };

    type CourseDetail = {
        id: string | number;
        title: string;
        description: string;
        type: string;

    };

    type ProductData = {
        data: {
            title: string;
            description: string;
            media: { thumbnail_url: string }[];
            cta_text: { name: string };
            checklist: { id: string | number; icon: string; text: string; color: string; list_page_visibility: boolean }[];
            sections: Section[];
        };
    };

    const typedProductData = productData as ProductData;

    const instructor = productData.data.sections.find((x: Instructor) => x.type === "instructors");
    const features = productData.data.sections.find((x: Feature) => x.type === "features");
    const pointers = productData.data.sections.find((x: Pointer) => x.type === "pointers");
    const feature_explanations = productData.data.sections.find((x: any) => x.type === "feature_explanations");
    const courseDetails = productData.data.sections.find((x: CourseDetail) => x.type === "about");



    return (
        <>
            <main className="flex flex-col  bg-amber-50 h-lvh">
                <div className="hero-section" style={heroStyle}>
                    <div className="container mx-auto flex flex-col gap-2">
                        <h1 className="text-white text-[21px] font-semibold  md:text-4xl">{productData.data.title}</h1>
                        <a href="#" className='flex gap-1.5'>
                            <Image src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png" alt="" /> (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                        </a>
                        <p className="text-gray-400 " dangerouslySetInnerHTML={{ __html: productData.data.description }} />
                    </div>
                </div>
                <div className="container flex">

                    <div className="flex-2 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">
                        <span className="mb-4 text-xl font-semibold md:text-2xl">Course instructor</span>
                        <section className='instructor-card'>
                            <div className="image-wrapper">
                                <Image src={instructor.values[0]?.image} alt="" />
                            </div>
                            <div className="info-wrapper">
                                <a className="name" href='#'>{instructor.values[0]?.name} </a>
                                <p className="text-gray-400 " dangerouslySetInnerHTML={{ __html: instructor.values[0].description }} />

                            </div>

                        </section>
                        <span className="mb-4 text-xl font-semibold md:text-2xl">{features.name}</span>

                        <section className='feature-wrapper'>
                            {features.values.map((x: Feature) => (
                                <div className="single-feature" key={x.id}>
                                    <span className="icon-wrapper">
                                        <Image src={x.icon} alt="" />
                                    </span>
                                    <div className="info-wrapper">
                                        <span className="title">{x.title}</span>
                                        <p>{x.subtitle}</p>
                                    </div>
                                </div>
                            ))}

                        </section>
                        <span className="mb-4 text-xl font-semibold md:text-2xl">{pointers.name}</span>

                        <section className='feature-wrapper'>
                            {pointers.values.map((x: Pointer) => (
                                <div className="single-feature" key={x.id}>
                                    <span className="icon-wrapper">
                                        ✔️
                                    </span>
                                    <div className="info-wrapper">
                                        <p>{x.text}</p>
                                    </div>
                                </div>
                            ))}

                        </section>
                        <span className="mb-4 text-xl font-semibold md:text-2xl">{feature_explanations.name}</span>

                        <section className='feature-wrapper grid grid-cols-1 px-5 border divide-y rounded-md '>
                            {feature_explanations.values.map((x: FeatureExplanation) => (
                                <div className="flex flex-col items-start justify-between gap-3 py-5 md:flex-row" key={x.id}>
                                    <div className="info-wrapper flex flex-col gap-2">
                                        <span className="title">{x.title}</span>
                                        {
                                            x.checklist.map((c: string, inx: number) => (
                                                <span key={inx}>✔️{c}</span>
                                            ))
                                        }
                                    </div>
                                    <div className='mb-4 mx-auto max-w-[350px] transition-opacity duration-300 ease-in-out'>

                                        <Image loading='lazy' height={250} width={200} src={x.file_url} alt="" />
                                    </div>

                                </div>
                            ))}

                        </section>
                        <span className="mb-4 text-xl font-semibold md:text-2xl">{courseDetails.name}</span>

                        <section className='feature-wrapper'>
                            {courseDetails.values.map((x: CourseDetail, index: number) => (
                                <div className="single-feature" key={x.id}>
                                    <span dangerouslySetInnerHTML={{ __html: x.title }} />
                                    <p className="text-gray-400 " dangerouslySetInnerHTML={{ __html: x.description }} />

                                </div>
                            ))}

                        </section>
                    </div>
                    <div className="sidebar flex flex-col  flex-1 ">
                        <div className="video-trailer">
                            <Image src={productData.data.media[0].thumbnail_url} alt="" />
                        </div>
                        <button className="cta">{productData.data?.cta_text.name}</button>
                        <span className="title">এই কোর্সে যা থাকছে</span>
                        <div className="check-list flex flex-col gap-2">
                            {
                                productData.data?.checklist.map((check: any) =>
                                    check.list_page_visibility ? (
                                        <div className="single-check flex gap-2" key={check.id} style={{ color: check.color }}>
                                            <Image src={check.icon} alt="" width={24} height={24} />
                                            <span className="text">{check.text}</span>
                                        </div>
                                    ) : null
                                )
                            }
                        </div>
                    </div>
                </div>


            </main>
        </>
    )
}