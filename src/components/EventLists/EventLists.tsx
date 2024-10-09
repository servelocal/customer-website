import { prisma } from '@/lib/prisma';

interface Community {
  community_id: number;
  community_name: string;
}
export default async function EventLists() {
  let communities: Community[] = [];

  try {
    // Fetching data directly from Prisma in the server component
    communities = await prisma.communities.findMany();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return (
    <div>
      {communities.map(({ community_id, community_name }) => (
        <p key={community_id}>{community_name}</p>
      ))}
    </div>
  );
}
