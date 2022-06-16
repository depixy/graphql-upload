import type { ReadStream, WriteStream } from "fs-capacitor";

export interface FileUpload {
  /**
   * File name.
   */
  filename: string;
  /**
   * File MIME type. Provided by the client and can’t be trusted.
   */
  mimetype: string;
  /**
   * File stream transfer encoding.
   */
  encoding: string;
  /**
   * A private implementation detail that shouldn’t be used outside
   */
  capacitor: WriteStream;
  createReadStream(options?: FileUploadCreateReadStreamOptions): ReadStream;
}

export interface FileUploadCreateReadStreamOptions {
  /**
   * Specify an encoding for the data chunks to be strings (without splitting multi-byte characters across chunks) instead of Node.js Buffer instances.
   *
   * Defaults to `utf8`.
   */
  encoding?: BufferEncoding;
  /**
   * Maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
   *
   * Defaults to `16384`.
   */
  highWaterMark?: number;
}
