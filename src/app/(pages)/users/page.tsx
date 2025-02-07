import { fetchActivity } from '@/utils/queries/fetchActivity';

export default async function Users() {
  const data = await fetchActivity();
  console.log('Users fetched from DB:', data);

  return <div>hello</div>;
}
