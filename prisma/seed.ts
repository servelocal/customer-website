import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert Counties
  await prisma.county.createMany({
    data: [
      { county_name: 'Greater London' },
      { county_name: 'West Midlands' },
      { county_name: 'Greater Manchester' },
      { county_name: 'Merseyside' },
    ],
  });

  // Insert Cities
  await prisma.city.createMany({
    data: [
      { city_name: 'London', county_id: 1 },
      { city_name: 'Birmingham', county_id: 2 },
      { city_name: 'Manchester', county_id: 3 },
      { city_name: 'Liverpool', county_id: 4 },
    ],
  });

  // Insert Locations
  await prisma.location.createMany({
    data: [
      {
        street_address: '10 Downing Street',
        post_code: 'SW1A 2AA',
        city_id: 1,
      },
      { street_address: '5 Bullring', post_code: 'B5 4BU', city_id: 2 },
      {
        street_address: '1 Piccadilly Gardens',
        post_code: 'M1 1RG',
        city_id: 3,
      },
      { street_address: 'Albert Dock', post_code: 'L3 4AB', city_id: 4 },
    ],
  });

  // Insert Contacts
  await prisma.contact.createMany({
    data: [
      {
        phone_number: '020 7925 0918',
        website: 'https://gov.uk',
        email_address: 'contact@gov.uk',
      },
      {
        phone_number: '0121 643 3933',
        website: 'https://bullring.co.uk',
        email_address: 'info@bullring.co.uk',
      },
      {
        phone_number: '0161 234 5000',
        website: 'https://manchester.gov.uk',
        email_address: 'hello@manchester.gov.uk',
      },
      {
        phone_number: '0151 478 4499',
        website: 'https://liverpool.com',
        email_address: 'contact@liverpool.com',
      },
    ],
  });

  // Insert Activities
  await prisma.activity.createMany({
    data: [
      {
        name: 'Museum Tour',
        description: 'Guided tour of London museums',
        category: 'Tourism',
        sub_category: 'Museum',
        rating: 8.9,
        price: 20.0,
        location_id: 1,
        contact_id: 1,
      },
      {
        name: 'Shopping Spree',
        description: 'Full-day shopping experience at Bullring',
        category: 'Leisure',
        sub_category: 'Shopping',
        rating: 9.0,
        price: 100.0,
        location_id: 2,
        contact_id: 2,
      },
      {
        name: 'Football Match',
        description: 'Watch a Premier League game at Old Trafford',
        category: 'Sports',
        sub_category: 'Football',
        rating: 9.5,
        price: 75.0,
        location_id: 3,
        contact_id: 3,
      },
      {
        name: 'Ferry Ride',
        description: 'Take a ferry across the Mersey',
        category: 'Transport',
        sub_category: 'Ferry',
        rating: 7.8,
        price: 15.0,
        location_id: 4,
        contact_id: 4,
      },
    ],
  });

  // Insert Timeslots
  await prisma.timeslot.createMany({
    data: [
      {
        day_of_week: 'Monday',
        opening_time: '1970-01-01T10:00:00.000Z',
        closing_time: '1970-01-01T12:00:00.000Z',
        activity_id: 1,
      },
      {
        day_of_week: 'Wednesday',
        opening_time: '1970-01-01T14:00:00.000Z',
        closing_time: '1970-01-01T16:00:00.000Z',
        activity_id: 1,
      },
      {
        day_of_week: 'Tuesday',
        opening_time: '1970-01-01T10:00:00.000Z',
        closing_time: '1970-01-01T18:00:00.000Z',
        activity_id: 2,
      },
      {
        day_of_week: 'Saturday',
        opening_time: '1970-01-01T10:00:00.000Z',
        closing_time: '1970-01-01T18:00:00.000Z',
        activity_id: 2,
      },
      {
        day_of_week: 'Sunday',
        opening_time: '1970-01-01T15:00:00.000Z',
        closing_time: '1970-01-01T17:00:00.000Z',
        activity_id: 3,
      },
      {
        day_of_week: 'Saturday',
        opening_time: '1970-01-01T15:00:00.000Z',
        closing_time: '1970-01-01T17:00:00.000Z',
        activity_id: 3,
      },
      {
        day_of_week: 'Friday',
        opening_time: '1970-01-01T10:00:00.000Z',
        closing_time: '1970-01-01T12:00:00.000Z',
        activity_id: 4,
      },
      {
        day_of_week: 'Sunday',
        opening_time: '1970-01-01T14:00:00.000Z',
        closing_time: '1970-01-01T16:00:00.000Z',
        activity_id: 4,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
