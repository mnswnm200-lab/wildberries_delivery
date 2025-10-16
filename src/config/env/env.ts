import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    API_KEY: z.string(),
    SPREADSHEETIDS: z.string().transform((value) => value.split(',')).pipe(z.string().trim().array()),
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
});

const env = envSchema.parse({
    API_KEY: process.env.API_KEY,
    SPREADSHEETIDS: process.env.SPREADSHEETIDS,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
});

export default env;
