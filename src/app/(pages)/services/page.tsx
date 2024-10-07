import ServiceList from '@/components/EventLists/EventLists';

export const metadata = {
  title: 'Services',
  description: 'List of services',
};

export default function page() {
  return (
    <main>
      <h1>Here are the list if services from the database</h1>

      <ServiceList />
    </main>
  );
}
