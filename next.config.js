/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'export',        // Static HTML export
	trailingSlash: true      // Optional: helps with Firebase routing
};

module.exports = nextConfig;
