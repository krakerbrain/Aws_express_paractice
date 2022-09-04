import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { AWS_BR, AWS_PK, AWS_SK, AWS_BN } from "./config.js";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: AWS_BR,
  credentials: {
    accessKeyId: AWS_PK,
    secretAccessKey: AWS_SK,
  },
});

export async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BN,
    Key: file.name,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

export async function getFiles() {
  const command = new ListObjectsCommand({
    Bucket: AWS_BN,
  });

  return await client.send(command);
}

export async function getFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BN,
    Key: filename,
  });

  return await client.send(command);
}

export async function getFileUrl(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BN,
    Key: filename,
  });

  return await getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function downloadFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BN,
    Key: filename,
  });

  const result = await client.send(command);
  console.log(result);
  result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
}
