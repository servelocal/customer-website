import Image from 'next/image';
import styles from './ActivityCard.module.scss';
import Link from 'next/link';

type Activity = {
  name: string;
  type: string;
  address: string;
  contact: {
    phone: string;
    website: string;
  };
  details: {
    openingTimes: {
      [day: string]: string;
    };
    priceRange: string;
    bannerImage: string;
    thumbnailImage: string;
  };
};

type ActivitySectionProps = {
  category: string;
  activities: Activity[];
};

export default function ActivityCard({
  category,
  activities,
}: ActivitySectionProps) {
  return (
    <section className={styles.categorySection}>
      <h4 className={styles.categoryTitle}>{category}</h4>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div className={styles.activityCard} key={activity.name}>
            {/* Dynamically loading banner image */}
            <Image
              src={'/images/hollywood-bowl-banner.avif'}
              alt={activity.name}
              width={1200} // Specify width and height for better performance
              height={500}
              className={styles.bannerImage}
            />
            <div className={styles.activityContent}>
              {/* Dynamically loading thumbnail image */}
              <Image
                src={'/images/hollywood-bowl-thumb.jpg'}
                alt={activity.name}
                width={200} // Specify width and height for better performance
                height={150}
                className={styles.thumbnailImage}
              />
              <div>
                <h5 className={styles.activityName}>{activity.name}</h5>
                <p className={styles.activityType}>{activity.type}</p>
                <p className={styles.activityAddress}>{activity.address}</p>
                <p className={styles.link}>
                  {/* Dynamically linking to the activity website */}
                  <Link href={'https://www.portsmouthclimbingwall.co.uk/'}>
                    Visit Website
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
