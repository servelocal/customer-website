import Link from 'next/link';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export default function Banner({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}: BannerProps) {
  return (
    <div
      className="flex h-96 w-full items-center justify-center bg-cover bg-center text-center text-black"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-2 text-5xl font-bold">{title}</h1>
        <p className="mb-4 text-lg">{subtitle}</p>
        <Link
          href={buttonLink}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
