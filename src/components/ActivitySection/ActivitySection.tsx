import styles from './ActivitySection.module.scss';

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

export default function ActivitySection({
  category,
  activities,
}: ActivitySectionProps) {
  return (
    <section className={styles.categorySection}>
      <h4 className={styles.categoryTitle}>{category}</h4>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div className={styles.activityCard} key={activity.name}>
            <img
              src={activity.details.bannerImage}
              alt={activity.name}
              className={styles.bannerImage}
            />
            <div className={styles.activityContent}>
              <img
                src={activity.details.thumbnailImage}
                alt={activity.name}
                className={styles.thumbnailImage}
              />
              <div>
                <h5 className={styles.activityName}>{activity.name}</h5>
                <p className={styles.activityType}>{activity.type}</p>
                <p className={styles.activityAddress}>{activity.address}</p>
                <p className={styles.link}>
                  <a
                    href={activity.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
