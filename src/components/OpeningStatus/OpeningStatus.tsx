'use client';
import { useEffect, useState } from 'react';
import type { OpeningTimesType } from '@/types';

type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const daysOfWeek: Weekday[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const rotateArray = <T,>(arr: T[], start: T): T[] => {
  const idx = arr.indexOf(start);
  return idx === -1 ? arr : [...arr.slice(idx), ...arr.slice(0, idx)];
};

export default function OpeningStatus({ openingTimes }: { openingTimes: OpeningTimesType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState<Weekday>('Monday');
  const [status, setStatus] = useState<'Open now' | 'Closed now' | 'Closed'>('Closed');

  useEffect(() => {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    setToday(currentDay);

    const todayHours = openingTimes[currentDay];
    if (!todayHours) {
      setStatus('Closed');
      return;
    }

    const nowMins = now.getHours() * 60 + now.getMinutes();
    const openMins = timeToMinutes(todayHours.open);
    const closeMins = timeToMinutes(todayHours.close);

    setStatus(nowMins >= openMins && nowMins <= closeMins ? 'Open now' : 'Closed now');
  }, [openingTimes]);

  const orderedDays = rotateArray(daysOfWeek, today);
  const dropdownDays = orderedDays.slice(1);
  const todayHours = openingTimes[today];

  return (
    <div className="text-base font-medium text-gray-700">
      <p
        onClick={() => setIsOpen((open) => !open)}
        className="text-xl font-semibold hover:cursor-pointer"
      >
        Opening Times
      </p>
      <div className={`mt-2 ${status === 'Open now' ? 'text-green-600' : 'text-red-700'}`}>
        {status}
      </div>

      <button
        className="my-2 flex items-center text-gray-700"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="opening-times-list"
      >
        <div className="flex w-72 justify-between">
          <span className="font-semibold">{today}</span>
          <span>{todayHours ? `${todayHours.open} - ${todayHours.close}` : 'Closed'}</span>
        </div>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul id="opening-times-list" className="w-72 space-y-2">
          {dropdownDays.map((day) => {
            const hours = openingTimes[day];
            return (
              <li key={day} className="flex justify-between text-gray-700">
                <span className="font-semibold">{day}</span>
                <span>{hours ? `${hours.open} - ${hours.close}` : 'Closed'}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
