/** @type {import('next').NextConfig} */
const config = require("./config");

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    env: {
        DB_URI: config.DB_URI,
        API: config.API,
        DOMAIN: config.DOMAIN,
        NEXTAUTH_URL: config.NEXTAUTH_URL,
        NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
        CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
        STRIPE_PUBLISHABLE_KEY: config.STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY,
        STRIPE_TAX_RATE: config.STRIPE_TAX_RATE,
        STRIPE_WEBHOOK_SECRET: config.STRIPE_WEBHOOK_SECRET,
        GMAIL_AUTH_USER: config.GMAIL_AUTH_USER,
        GMAIL_AUTH_PASS: config.GMAIL_AUTH_PASS
    },
};

module.exports = nextConfig;