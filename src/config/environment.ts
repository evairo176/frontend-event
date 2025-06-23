const environment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  JWT_EXPIRES_IN: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN,
};

export default environment;
export type Environment = typeof environment;
export type EnvironmentKeys = keyof Environment;
