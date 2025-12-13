const config = {
  isDev: () => process.env.NEXT_PUBLIC_ENV === "dev",
  isProd: () => process.env.NEXT_PUBLIC_ENV === "prod",
  isStaging: () => process.env.NEXT_PUBLIC_ENV === "staging",
  ENV: process.env.NEXT_PUBLIC_ENV,
  FE_URL: process.env.NEXT_PUBLIC_FE_URL,
};

export default config;
