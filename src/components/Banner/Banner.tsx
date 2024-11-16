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
    <div className="relative flex h-96 w-full items-center justify-center text-center text-black">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        layout="fill" // Fills the parent container
        objectFit="cover" // Ensures the image covers the container
        objectPosition="center" // Center the image
        quality={100} // Adjust image quality as needed
        priority // Optional: Preloads the image for better performance (use for above-the-fold images)
        className="-z-10" // Ensures the image stays behind the content
      />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl p-6">
        <h1 className="mb-2 text-5xl font-bold">{title}</h1>
        <p className="mb-4 text-lg">{subtitle}</p>
        {buttonLink && buttonText && (
          <Link
            href={buttonLink}
            className="rounded-xl bg-blue-600 px-4 py-4 text-white hover:bg-blue-700"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
