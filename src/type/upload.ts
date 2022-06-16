import type { FileUpload } from "./file-upload.js";

/**
 * A file expected to be uploaded as it was declared in the `map` field of a
 * [GraphQL multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec).
 *
 * The `processRequest` function places references to an instance of this class wherever the file is expected in the GraphQL operation.
 * The scalar `GraphQLUpload` derives it’s value from `Upload.promise`.
 */
export class Upload {
  /**
   * Promise that resolves file upload details.
   *
   * This should only be utilized by `GraphQLUpload`.
   */
  promise: Promise<FileUpload>;
  /**
   * Resolves the upload promise with the file upload details.
   *
   * This should only be utilized by `processRequest`.
   */
  resolve?: (data: FileUpload) => void;
  /**
   * The file upload details, available when the `Upload.promise` resolves.
   *
   * This should only be utilized by `processRequest`.
   */
  file?: FileUpload;

  /**
   * Rejects the upload promise with an error.
   *
   * This should only be  utilized by `processRequest`.
   */
  reject?: (reason?: any) => void;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = file => {
        this.file = file;
        resolve(file);
      };
      this.reject = reject;
    });

    this.promise.catch(() => {
      // Prevent errors crashing Node.js, see:
      // https://github.com/nodejs/node/issues/20392
    });
  }
}
