/** @type {import('next').NextConfig} */
// import cors from 'cors';
import cors from 'micro-cors';

const nextConfig = {
    reactStrictMode: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
    },
};

export default nextConfig;