import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }
}
