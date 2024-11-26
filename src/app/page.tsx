import ActivityList from '@/components/ActivityList';
import Banner from '@/components/Banner';

export default function HomePage() {
  return (
    <div>
      <Banner
        title="Welcome to SideQuest"
        subtitle="Discover amazing services and activities in your area"
        buttonText="Portsmouth"
        buttonLink="/city/portsmouth/activities"
        backgroundImage="/images/bg2.svg"
      />

      <ActivityList />
    </div>
  );
}
// }
