import getServices from '@/postgres/getServices';

export default async function ServiceList() {
  const services = await getServices();
  console.log(services);

  return (
    <div>
      {services?.map(({ service_name, service_id }) => (
        <p key={service_id}>{service_name}</p>
      ))}
    </div>
  );
}
