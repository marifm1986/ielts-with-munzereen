
import Image from 'next/image';
import { Metadata } from 'next';

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

  // Extract Open Graph image from defaultMeta
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
    // You can optionally embed structured data using other methods if needed
  };
}



export interface Data {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: { thumbnail_url: string }[]; // Fixed
  checklist: {
    id?: string | number;
    text: string;
    icon: string;
    color: string;
    list_page_visibility: boolean;
  }[];
  seo: any;
  cta_text: { name: string }; // Fixed
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
    <main className="flex  bg-gray-100 h-lvh">
      <div className="container flex text-black mx-auto p-6 gap-8">
        <div className="main-content flex-2/3 flex flex-col gap-8">
          <div className="hero-section flex flex-col gap-4">
            <h1 className="text-[21px] font-semibold md:text-4xl">{typedProductData.title}</h1>
            <a href="#" className='flex gap-1.5'>
              <Image src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png" alt="Rating badge" width={100} height={100} />
              (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
            </a>
            <p className="" dangerouslySetInnerHTML={{ __html: typedProductData.description }} />
          </div>
          {/* Instructor */}
          {instructor && (
            <div className='instructor-wrapper flex flex-col gap-1 w-full'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">Course instructor</span>
              <section className='instructor-card flex gap-4 items-center w-full bg-gray-200 p-4 rounded-md overflow-hidden'>
                <div className="image-wrapper overflow-hidden">
                  <Image src={instructor.values[0]?.image} alt={instructor.values[0]?.name || "Instructor"} width={80} height={100} />
                </div>
                <div className="info-wrapper w-full">
                  <a className="name" href='#'>{instructor.values[0]?.name}</a>
                  <p className="flex w-full" dangerouslySetInnerHTML={{ __html: instructor.values[0]?.description }} />
                </div>
              </section>
            </div>
          )}

          {/* Features */}
          {features && (
            <div className='features-wrapper flex flex-col bg-white border-2 border-gray-200 gap-4 p-6 rounded-xl'>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{features.name}</span>
              <section className='feature-wrapper grid grid-cols-2 gap-4'>
                {features.values.map((x: any) => (
                  <div className="single-feature gap-4 flex" key={x.id}>
                    <div className="icon-wrapper">
                      <Image className='object-contain object-center min-w-8' src={x.icon} alt="Feature icon" width={24} height={100} />
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
            <>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{pointers.name}</span>
              <section className='feature-wrapper'>
                {pointers.values.map((x: any) => (
                  <div className="single-feature" key={x.id}>
                    <span className="icon-wrapper">✔️</span>
                    <div className="info-wrapper">
                      <p>{x.text}</p>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* Feature Explanations */}
          {feature_explanations && (
            <>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{feature_explanations.name}</span>
              <section className='feature-wrapper grid grid-cols-1 px-5 border divide-y rounded-md'>
                {feature_explanations.values.map((x: any) => (
                  <div className="flex flex-col items-start justify-between gap-3 py-5 md:flex-row" key={x.id}>
                    <div className="info-wrapper flex flex-col gap-2">
                      <span className="title">{x.title}</span>
                      {x.checklist.map((c: string, inx: number) => (
                        <span key={inx}>✔️ {c}</span>
                      ))}
                    </div>
                    <div className='mb-4 mx-auto max-w-[350px]'>
                      <Image src={x.file_url} alt={x.title || "Feature"} width={200} height={250} />
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* Course Details */}
          {courseDetails && (
            <>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{courseDetails.name}</span>
              <section className='feature-wrapper'>
                {courseDetails.values.map((x: any) => (
                  <div className="single-feature" key={x.id}>
                    <span dangerouslySetInnerHTML={{ __html: x.title }} />
                    <p className="" dangerouslySetInnerHTML={{ __html: x.description }} />
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
        {/* Sidebar */}
        <div className="sidebar flex flex-col flex-1/3 ">
          <div className="video-trailer flex flex-col shadow-2xl rounded-2xl overflow-clip gap-4">
            <Image
              className='w-full'
              src={typedProductData.media[0]?.thumbnail_url || "/fallback.jpg"}
              alt="Video thumbnail"
              width={400}
              height={250}
            />
            <div className="image-gallery flex gap-4 items-center overflow-auto">
              {
                typedProductData.media.map((x, id) => (
                  x.thumbnail_url ? (
                    <Image className='flex-1' src={x?.thumbnail_url} alt={x.thumbnail_url} width={100} height={100} key={id} />
                  ) : null


                ))
              }
            </div>
            <span className="price text-3xl font-bold p-4">৳1,000</span>
            <button className="cta bg-green-600 text-white p-4">{typedProductData.cta_text?.name}</button>
          </div>
          <span className="title">এই কোর্সে যা থাকছে</span>
          <div className="check-list flex flex-col gap-2">
            {typedProductData.checklist.map((check, index) =>
              check.list_page_visibility ? (
                <div className="single-check flex gap-2" key={check.id || index} style={{ color: check.color }}>
                  <Image src={check.icon} alt={check.text} width={24} height={24} />

                  <span className="text">{check.text}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

    </main>
  );
}
