import { prisma } from '@/lib/prisma';
import styles from './ServiceCard.module.scss';
import Image from 'next/image';

type Services = {
  service_id: number;
  name: string;
  category: string | null;
};

const ServiceCard = async () => {
  const services: Services[] = await prisma.services.findMany();

  return (
    <div className={styles.cardGrid}>
      {services.map(({ service_id, name, category }) => (
        <div key={service_id} className={styles.card}>
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
            <p className={styles.cardCategory}>{category || 'General'}</p>
            <button className={styles.cardButton}>Learn More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
