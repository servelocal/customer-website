import Carousel from '@/components/Carousel';

export default function HomePage() {
  return (
    <div>
      <Carousel
        slides={[
          {
            src: '/images/bg2.svg',
            alt: 'Slide 1',
            title: 'Welcome To SideQuest',
            description: 'Why are u here',
          },
        ]}
      />
    </div>
  );
}
