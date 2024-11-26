import { prisma } from '@/utils/prisma';

interface Activity {
  activity_id: string;
  name: string;
  description: string | null;
  category: string | null;
  sub_category: string | null;
  rating: number;
  tags: string[];
  price: number;
  location_id: string;
  contact_id: string;
}

export default async function ActivityList() {
  // Fetch activity data from the database
  const activities: Activity[] = await prisma.activity.findMany();
  console.log(activities);
  return (
    <main className="p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Activities Fetched from Database</h1>
      </header>
      {activities.length > 0 ? (
        <section className="space-y-6">
          {activities.map((activity) => (
            <article
              key={activity.activity_id}
              className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">{activity.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {activity.category} - {activity.sub_category}
                </p>
              </header>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Description:</strong> {activity.description}
                </p>
                <p className="text-gray-700">
                  <strong>Rating:</strong> {activity.rating.toFixed(1)}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${activity.price.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <strong>Tags:</strong>{' '}
                  <span className="text-blue-600">{activity.tags.join(', ')}</span>
                </p>
              </div>
              <footer className="mt-4 text-sm text-gray-500">
                <p>
                  <strong>Location ID:</strong> {activity.location_id}
                </p>
                <p>
                  <strong>Contact ID:</strong> {activity.contact_id}
                </p>
              </footer>
            </article>
          ))}
        </section>
      ) : (
        <section>
          <p className="text-center text-gray-500">No activities found.</p>
        </section>
      )}
    </main>
  );
}
