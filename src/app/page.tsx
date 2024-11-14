import Banner from '@/components/Banner/Banner';

export default function HomePage() {
  return (
    <div>
      <Banner
        title="Welcome to Sidequest"
        subtitle="Discover amazing services and activities in your area"
        buttonText="Get Started"
        buttonLink="/activities"
        backgroundImage="https://img.freepik.com/premium-vector/yellow-background-with-dynamic-abstract-shapes_580167-286.jpg"
      />
    </div>
  );
}
