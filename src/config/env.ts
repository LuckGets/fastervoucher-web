import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    // API_URL: z.string()
  });

  const envVariable = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith('VITE_APP')) {
      acc[key.replace('VITE_APP', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVariable);

  if (!parsedEnv.success) {
    throw new Error(`Invalid env variable.
  The following valirables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`);
  }
  return parsedEnv.data;
};

export const env = createEnv();
