const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // Sử dụng SandboxEnvironment cho testing hoặc LiveEnvironment cho production
  const environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment);
}

module.exports = { paypalClient: configureEnvironment() };