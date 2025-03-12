module.exports = {
  webpack(config, { isServer }) {
    // Kích hoạt experiments.layers
    config.experiments = {
      layers: true
    };

    return config;
  }
};
