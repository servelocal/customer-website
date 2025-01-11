'use client';
import { create } from '@/app/actions/cookie';

const CookieConsentBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-black p-4 text-white">
      <p className="text-sm">
        We use cookies to improve your experience. Do you consent to the use of cookies?
      </p>
      <div>
        <button className="mr-2 rounded-md px-4 py-2 text-white">Decline</button>
        <button className="rounded-md bg-white px-4 py-2 text-black" onClick={() => create()}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
