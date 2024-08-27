import SliderBanner from "@/app/components/slidebanner";


export const mockImages = [
    { src: '/mockbannerimage/book1.png', alt: 'Banner 1' },
    { src: '/mockbannerimage/book2.png', alt: 'Banner 2' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SliderBanner images={mockImages} />
    </main>
  );
}
