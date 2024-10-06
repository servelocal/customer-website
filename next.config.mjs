/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src', 'app', 'styles')],
    prependData: `@import 'variables.scss';`,
  },
};

export default nextConfig;
