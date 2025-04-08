module.exports = {
  webpack(config, { isServer }) {
    // Kích hoạt experiments.layers
    config.experiments = {
      layers: true
    };

    return config;
  }
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Cổng backend của bạn
        pathname: "/uploads/**", // Đường dẫn chứa ảnh
      },
    ],
  },
};

module.exports = nextConfig;
