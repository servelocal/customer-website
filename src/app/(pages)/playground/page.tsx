import Button from '@/components/Button';
import Link from 'next/link';
import styles from './page.module.scss';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
// import ActivitiesCard from '@/components/ActivitiesCard';
import { prisma } from '@/lib/client';
import ActivityCard from '@/components/ActivityCard';

type Activity = {
  activity_id: number;
  name: string;
  type: string;
  category: string | null;
  address: string | null;
  contact: {
    phone: string | null;
    website: string | null;
  };
  details: {
    openingTimes: {
      [day: string]: string | null;
    };
    priceRange: string | null;
    bannerImage: string | null;
    thumbnailImage: string | null;
  };
};

export default async function PlaygroundPage() {
  const activities: Activity[] = await prisma.activity.findMany();

  // Extract categories from the activities
  const categories = Array.from(
    new Set(activities.map((activity) => activity.category || 'General'))
  );

  return (
    <main>
      <h1>Play with your components</h1>
      <div className={styles.buttonsContainer}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>

        <Link href="/notFoundExmple">
          <Button>Not Found</Button>
        </Link>

        <Button icon={<FaArrowLeftLong />} iconPosition="left">
          Icon Left
        </Button>
        <Button icon={<FaArrowRightLong />} iconPosition="right">
          Icon Right
        </Button>

        <Button
          className={styles.button}
          icon={<IoClose />}
          ariaLabel="close"
        ></Button>

        {/* <ActivitiesCard /> */}

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
      </div>
    </main>
  );
}
