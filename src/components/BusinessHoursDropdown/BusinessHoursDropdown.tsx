'use client';

import { useEffect, useMemo, useState } from 'react';
import type { BusinessHoursProps, Weekday } from '@/types';

const daysOfWeek: Weekday[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export default function BusinessHoursDropdown({
  businessHours,
}: {
  businessHours: BusinessHoursProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState<Weekday>('Monday');
  const [status, setStatus] = useState<'Open now' | 'Closed now' | 'Closed'>('Closed');

  useEffect(() => {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    setToday(currentDay);

    const todayHours = businessHours[currentDay];
    if (!todayHours) return setStatus('Closed');

    const nowMins = now.getHours() * 60 + now.getMinutes();
    const openMins = timeToMinutes(todayHours.open);
    const closeMins = timeToMinutes(todayHours.close);

    setStatus(nowMins >= openMins && nowMins <= closeMins ? 'Open now' : 'Closed now');
  }, [businessHours]);

  const orderedDays = useMemo(() => {
    const idx = daysOfWeek.indexOf(today);
    return [...daysOfWeek.slice(idx), ...daysOfWeek.slice(0, idx)];
  }, [today]);

  const renderTimeRange = (hours?: { open: string; close: string } | null) =>
    hours ? `${formatTime(hours.open)} - ${formatTime(hours.close)}` : 'Closed';

  return (
    <div className="flex flex-col gap-2 text-base font-medium text-gray-700">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-xl font-semibold text-black"
        aria-expanded={isOpen}
        aria-controls="opening-times-list"
      >
        Opening Times
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={status === 'Open now' ? 'text-green-600' : 'text-red-700'}>{status}</div>

      <div className="flex justify-between">
        <span className="font-semibold">{today}</span>
        <span>{renderTimeRange(businessHours[today])}</span>
      </div>

      {isOpen && (
        <ul id="opening-times-list" className="w-full space-y-2">
          {orderedDays.slice(1).map((day) => (
            <li key={day} className="flex justify-between">
              <span className="font-semibold">{day}</span>
              <span>{renderTimeRange(businessHours[day])}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
