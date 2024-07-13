import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getFile(filename: string) {
    throw new Error('Method not implemented.');
  }
}
