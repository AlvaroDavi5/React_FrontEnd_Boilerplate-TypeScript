/** @type {import('next').NextConfig} */


/* eslint-disable import/unambiguous */
const nextConfig = {
	reactStrictMode: true,
	env: {
		MOCKED_SERVICE_URL: process.env.MOCKED_SERVICE_URL,
	},
};
/* eslint-enable import/unambiguous */

module.exports = nextConfig;
