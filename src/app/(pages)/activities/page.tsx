import { prisma } from '@/lib/client';
import styles from './page.module.scss';
import ActivityCard from '@/components/ActivityCard';

type Activity = {
  activity_id: number;
  name: string;
  type: string;
  category: string | null;
  address: string | null;
  // contact: {
  //   phone: string | null;
  //   website: string | null;
  // };
  // details: {
  //   openingTimes: {
  //     [day: string]: string | null;
  //   };
  //   priceRange: string | null;
  //   bannerImage: string | null;
  //   thumbnailImage: string | null;
  // };
};

export default async function ActivitiesPage() {
  const activities: Activity[] = await prisma.activity.findMany();

  // Extract categories from the activities
  const categories = Array.from(
    new Set(activities.map((activity) => activity.category || 'General'))
  );

  return (
    <div className={styles.activitiesPage}>
      <h1 className={styles.title}>Activities in Portsmouth</h1>
      {categories.map((category) => (
        <ActivityCard
          key={category}
          category={category}
          activities={activities.filter(
            (activity) => activity.category === category
          )}
        />
      ))}
    </div>
  );
}
