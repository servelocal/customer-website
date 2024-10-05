'use client';
import { useEffect, useState } from 'react';
import styles from './EventList.module.scss';
import Image from 'next/image';

interface Event {
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

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/data/events.json');
      const data = await response.json();
      setEvents(data.events);
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.eventList}>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.event_id} className={styles.eventItem}>
            <Image
              src={event.thumbnail}
              alt={event.name}
              width={150}
              height={150}
              className={styles.thumbnail}
            />
            <div className={styles.eventDetails}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(event.start_date).toLocaleDateString()} -{' '}
                {new Date(event.end_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Price:</strong> £{event.price.toFixed(2)}
              </p>
              <p>
                <strong>Type:</strong> {event.type}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
