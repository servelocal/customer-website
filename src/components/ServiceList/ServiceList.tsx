import getServices from '@/postgres/getServices';

export default async function ServiceList() {
  const services = await getServices();
  console.log(services);

  return (
    <>
      Here is the list of services
      <div>
        {services?.map((service, i) => <p key={i}>{service.service_name}</p>)}
      </div>
    </>
  );
}
