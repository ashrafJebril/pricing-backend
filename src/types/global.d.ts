/* eslint-disable prettier/prettier */
declare namespace Express {
  export interface Multer {
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      buffer: Buffer;
    };
  }
}
