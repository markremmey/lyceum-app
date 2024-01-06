/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com', 'platform-lookaside.fbsbx.com', 'firebasestorage.googleapis.com']
    },
    experimental: {
        appDir: true
    }
}

module.exports = nextConfig