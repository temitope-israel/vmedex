import { Client } from "basic-ftp";
import { Readable } from "stream";

// Uploads a file buffer to the training-documents folder via FTPS.
// This is the one function that changes if the app later moves to run
// directly on the cPanel server — everything else stays the same.
export async function uploadFile(buffer: Buffer, filename: string): Promise<string> {
  const client = new Client();

  try {
    await client.access({
      host: process.env.FTP_HOST,
      port: Number(process.env.FTP_PORT),
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: true, // enables explicit FTPS (encrypted)
    });

    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, filename);

    return filename;
  } finally {
    client.close();
  }
}