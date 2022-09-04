import { config } from "dotenv";

config();

export const AWS_BN = process.env.AWS_BUCKET_NAME;
export const AWS_BR = process.env.AWS_BUCKET_REGION;
export const AWS_PK = process.env.AWS_PUBLIC_KEY;
export const AWS_SK = process.env.AWS_SECRET_KEY;
