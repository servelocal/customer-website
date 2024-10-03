/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'app', 'styles')], // Point to src/app/styles
    prependData: `@import 'variables.scss';`, // Relative to the includePaths directory
  },
};

export default nextConfig;
