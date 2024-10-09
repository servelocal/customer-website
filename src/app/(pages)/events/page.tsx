import EventList from '@/components/EventList';
import EventLists from '@/components/EventLists/EventLists';

export default async function EventsPage() {
  return (
    <div>
      <div>
        <h2>This is the events from the database</h2>
        <EventLists />
      </div>
      <br />
      <div>
        <h2>This is from JSON file</h2>
        <EventList />
      </div>
    </div>
  );
}
