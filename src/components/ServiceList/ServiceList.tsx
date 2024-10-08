import styles from './ServiceList.module.scss';
import Image from 'next/image';

interface Service {
  event_id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  start_date: string;
  end_date: string;
  thumbnail: string;
  type: string;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList = ({ services }: ServiceListProps) => {
  return (
    <div className={styles.serviceList}>
      <h1>Upcoming Events</h1>
      <ul>
        {services.map((service) => (
          <li key={service.event_id} className={styles.serviceItem}>
            <Image
              src={service.thumbnail}
              alt={service.name}
              width={150}
              height={150}
              className={styles.thumbnail}
            />
            <div className={styles.serviceDetails}>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <p>
                <strong>Location:</strong> {service.location}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(service.start_date).toLocaleDateString()} -{' '}
                {new Date(service.end_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Price:</strong> £{service.price.toFixed(2)}
              </p>
              <p>
                <strong>Type:</strong> {service.type}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
