import { useLocation } from '@/context/LocationContext';
import { ActivitiesPageParams } from '@/types/pageParams';
import { fetchActivity } from '@/utils/queries/fetchActivity';

export default async function Users({ params }: { params: ActivitiesPageParams }) {
  const { location } = useLocation();
  console.log(location);

  const data = await fetchActivity(location);
  console.log('Users fetched from DB:', data);

  return <div>hello</div>;
}
