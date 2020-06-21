import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tempPath = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tempPath: string;
  uploadFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  tempPath,
  uploadFolder: path.resolve(tempPath, 'uploads'),
  driver: process.env.STORAGE_DRIVER,

  multer: {
    storage: multer.diskStorage({
      destination: tempPath,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'cnd-gobarber',
    },
  },
} as IUploadConfig;
