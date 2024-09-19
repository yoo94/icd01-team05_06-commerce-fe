import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import BookSection from './components/book-section';
import { Book } from '@/types/book-types';
import { Card, CardContent } from '@/components/ui/card';
import mswApi from '@/lib/msw-api';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const mainImages = [
    { src: '/images/banner/main_banner_01.png', alt: 'Banner 1' },
    { src: '/images/banner/main_banner_02.png', alt: 'Banner 2' },
    { src: '/images/banner/main_banner_03.png', alt: 'Banner 3' },
    { src: '/images/banner/main_banner_04.png', alt: 'Banner 4' },
  ];

  const eventImages = [
    { src: '/images/banner/event_banner_01.png', alt: 'Event 1' },
    { src: '/images/banner/event_banner_02.png', alt: 'Event 2' },
  ];

  const [newReleasesResponse, recommendedBooksResponse, bestSellersResponse] = await Promise.all([
    mswApi.get('books/new-releases').json<Book[]>(),
    mswApi.get('books/recommended').json<Book[]>(),
    mswApi.get('books/best-sellers').json<Book[]>(),
  ]);

  const newReleases: Book[] = Array.isArray(newReleasesResponse) ? newReleasesResponse : [];
  const recommendedBooks: Book[] = Array.isArray(recommendedBooksResponse)
    ? recommendedBooksResponse
    : [];
  const bestSellers: Book[] = Array.isArray(bestSellersResponse) ? bestSellersResponse : [];

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-8">
        <Carousel
          className="relative size-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {mainImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="relative size-full">
                  <CardContent className="relative flex aspect-video items-center justify-center p-6">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
            aria-label="Previous"
          />

          <CarouselNext
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
            aria-label="Next"
          />
        </Carousel>
      </section>

      {/* New Releases Section */}
      <BookSection title="화제의 신간" books={newReleases} />

      {/* Recommended Books Section */}
      <BookSection title="추천 도서" books={recommendedBooks} />

      {/* Best Sellers Section */}
      <BookSection title="베스트 셀러" books={bestSellers} />

      {/* Event Section */}
      <section className="relative mb-8">
        <h2 className="mb-4 text-xl font-bold">이벤트</h2>
        <Carousel
          className="relative size-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {eventImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="relative h-32 w-full">
                  <CardContent className="relative flex size-full items-center justify-center bg-slate-100 p-6">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
