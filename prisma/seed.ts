// STEP 1: npx prisma generate
// STEP 2: npx prisma migrate dev --name init

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
      { county_name: 'Hampshire' },
    ],
  });

  // Insert Cities
  await prisma.city.createMany({
    data: [
      { city_name: 'London', county_id: 1 },
      { city_name: 'Birmingham', county_id: 2 },
      { city_name: 'Manchester', county_id: 3 },
      { city_name: 'Liverpool', county_id: 4 },
      { city_name: 'Portsmouth', county_id: 5 },
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
      {
        street_address: '5 Bullring',
        post_code: 'B5 4BU',
        city_id: 2,
      },
      {
        street_address: '1 Piccadilly Gardens',
        post_code: 'M1 1RG',
        city_id: 3,
      },
      {
        street_address: 'Albert Dock',
        post_code: 'L3 4AB',
        city_id: 4,
      },
      {
        street_address: 'Gunwharf Quays',
        post_code: 'PO1 3TU',
        city_id: 5, // Portsmouth
      },
      {
        street_address: 'Eastern Rd',
        post_code: 'PO3 5TU',
        city_id: 5, // Portsmouth
      },
      {
        street_address: 'The Pyramids Centre, Clarence Esplanade',
        post_code: 'PO5 3ST',
        city_id: 5, // Portsmouth
      },
      {
        street_address: 'Albert Rd',
        post_code: 'PO4 0JR',
        city_id: 5, // Portsmouth
      },
    ],
  });

  // Insert Contacts
  await prisma.contact.createMany({
    data: [
      {
        phone_number: '+442079250918',
        website: 'https://gov.uk',
        email_address: 'contact@gov.uk',
      },
      {
        phone_number: '+441216433933',
        website: 'https://bullring.co.uk',
        email_address: 'info@bullring.co.uk',
      },
      {
        phone_number: '+441612345000',
        website: 'https://manchester.gov.uk',
        email_address: 'hello@manchester.gov.uk',
      },
      {
        phone_number: '+441514784499',
        website: 'https://liverpool.com',
        email_address: 'contact@liverpool.com',
      },
      {
        phone_number: '+448448261459',
        website: 'https://www.hollywoodbowl.co.uk/portsmouth',
        email_address: 'contact@hollywoodbowl.com',
      },
      {
        phone_number: '+442392661250',
        website: 'http://www.southseagolf.co.uk/',
        email_address: 'contact@southseagolf.com',
      },
      {
        phone_number: '+442392737120',
        website: 'https://www.portsmouthclimbingwall.co.uk/',
        email_address: 'contact@portsmouthclimbingwall.com',
      },
      {
        phone_number: '+442392873020',
        website: 'https://diceportsmouth.com/',
        email_address: 'contact@diceportsmouth.com',
      },
    ],
  });

  // Insert Activities
  await prisma.activity.createMany({
    data: [
      {
        name: 'Hollywood Bowl',
        description: 'Bowling at Gunwharf Quays',
        category: 'Sports',
        sub_category: 'Bowling',
        rating: 8.5,
        price: 25.0,
        location_id: 1,
        contact_id: 1,
      },
      {
        name: 'Southsea Golf Club',
        description: 'Golfing at Southsea Golf Club',
        category: 'Sports',
        sub_category: 'Golf',
        rating: 9.0,
        price: 60.0, // Convert $$$ to approximate price
        location_id: 2, // Southsea location
        contact_id: 2, // Southsea Golf contact
      },
      {
        name: 'Portsmouth Climbing Wall',
        description: 'Indoor bouldering and climbing',
        category: 'Sports',
        sub_category: 'Climbing',
        rating: 8.2,
        price: 15.0, // Convert $$ to approximate price
        location_id: 3, // Pyramids Centre location
        contact_id: 3, // Climbing Wall contact
      },
      {
        name: 'Dice Board Game Lounge',
        description: 'Board games and cafe experience',
        category: 'Other',
        sub_category: 'Cafe',
        rating: 9.1,
        price: 10.0, // Convert $ to approximate price
        location_id: 4, // Albert Rd location
        contact_id: 4, // Dice Lounge contact
      },
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
