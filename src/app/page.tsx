import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>This is the Home page</h1>
      <Link href="/playground">Go to playground 🤜</Link>
    </main>
  );
}
