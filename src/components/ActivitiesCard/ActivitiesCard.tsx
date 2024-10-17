import { prisma } from '@/lib/client';
import styles from './ActivitiesCard.module.scss';
import Image from 'next/image';
import Button from '../Button';
// import Image from 'next/image';

type Activities = {
  activity_id: number;
  name: string;
  category: string | null;
  description: string | null;
};

export default async function ActivitiesCard() {
  const activities: Activities[] = await prisma.activity.findMany();

  return (
    <div className={styles.cardGrid}>
      {activities.map(({ activity_id, name, category, description }) => (
        <div key={activity_id} className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/placeholder-image.jpg"
              alt={name}
              layout="fill"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{name}</h2>
            <p>{description}</p>
            <p className={styles.cardCategory}>{category || 'General'}</p>
            <Button className={styles.cardButton}>Learn More</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
