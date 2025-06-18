const environment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

export default environment;
export type Environment = typeof environment;
export type EnvironmentKeys = keyof Environment;
