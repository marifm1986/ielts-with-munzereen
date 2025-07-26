
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch('https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en', {
    headers: {
      'X-TENMS-SOURCE-PLATFORM': 'web',
    },
    next: { revalidate: 60 }, // safe for export builds
  });

  const productData = await res.json();
  const seo = productData?.data?.seo || {};

  return {
    title: seo.metaTitle || 'IELTS Course - Product Page',
    description: seo.metaDescription || 'Explore the IELTS Course product details, description, and media.',
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.metaImage ? [{ url: seo.metaImage }] : [],
    },
    twitter: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      card: 'summary_large_image',
      images: seo.metaImage ? [seo.metaImage] : [],
    },
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
    <main className="flex flex-col bg-amber-50 h-lvh">
      <div className="hero-section" style={heroStyle}>
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="text-white text-[21px] font-semibold md:text-4xl">{typedProductData.title}</h1>
          <a href="#" className='flex gap-1.5'>
            <Image src="https://cdn.10minuteschool.com/images/Dev_Handoff_Q1_24_Frame_2_1725444418666.png" alt="Rating badge" width={100} height={24} />
            (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
          </a>
          <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: typedProductData.description }} />
        </div>
      </div>

      <div className="container flex">
        <div className="flex-2 md:max-w-[calc(100%_-_348px)] lg:max-w-[calc(100%_-_448px)]">
          {/* Instructor */}
          {instructor && (
            <>
              <span className="mb-4 text-xl font-semibold md:text-2xl">Course instructor</span>
              <section className='instructor-card'>
                <div className="image-wrapper">
                  <Image src={instructor.values[0]?.image} alt={instructor.values[0]?.name || "Instructor"} width={100} height={100} />
                </div>
                <div className="info-wrapper">
                  <a className="name" href='#'>{instructor.values[0]?.name}</a>
                  <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: instructor.values[0]?.description }} />
                </div>
              </section>
            </>
          )}

          {/* Features */}
          {features && (
            <>
              <span className="mb-4 text-xl font-semibold md:text-2xl">{features.name}</span>
              <section className='feature-wrapper'>
                {features.values.map((x: any) => (
                  <div className="single-feature" key={x.id}>
                    <span className="icon-wrapper">
                      <Image src={x.icon} alt="Feature icon" width={32} height={32} />
                    </span>
                    <div className="info-wrapper">
                      <span className="title">{x.title}</span>
                      <p>{x.subtitle}</p>
                    </div>
                  </div>
                ))}
              </section>
            </>
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
                    <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: x.description }} />
                  </div>
                ))}
              </section>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar flex flex-col flex-1">
          <div className="video-trailer">
            <Image
              src={typedProductData.media[0]?.thumbnail_url || "/fallback.jpg"}
              alt="Video thumbnail"
              width={400}
              height={250}
            />
          </div>
          <button className="cta">{typedProductData.cta_text?.name}</button>
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
