import Link from 'next/link';
import Image from 'next/image';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
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
    <div className="shadow-inset relative flex h-96 w-full items-center justify-center text-center text-black">
      <Image
        src={backgroundImage}
        alt={title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority
        className="-z-10"
      />
      <div className="relative z-10 mx-auto max-w-3xl p-6">
        <h1 className="mb-2 text-5xl font-bold">{title}</h1>
        <p className="mb-8 text-lg text-gray-600">{subtitle}</p>
        {buttonLink && buttonText && (
          <Link
            href={buttonLink}
            className="rounded-2xl bg-black p-5 text-lg text-white hover:bg-slate-800"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
