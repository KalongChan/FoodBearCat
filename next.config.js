/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // experiments: {
  //   topLevelAwait: true,
  //   webpack(config) {
  //     config.experiments = {...config.experiments, topLevelAwait: true};
  //     return config;
  //   },
  // },
};

module.exports = nextConfig;
