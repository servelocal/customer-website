'use client';
import ServiceList from '@/components/ServiceList';
import { useEffect, useState } from 'react';

const EventsPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/data/events.json');
      const data = await response.json();
      setServices(data.events);
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <ServiceList services={services} />
    </div>
  );
}
