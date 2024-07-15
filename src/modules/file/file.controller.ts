import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "src/common/custom/pipes/file-size-validation.pipe"
import { MESSAGES } from "src/common/constants/messages.constant";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(":filename")
  getFile(@Param("filename") filename: string) {
    return "Method not implemented.";
  }

  @Post(":cardId")
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(FileSizeValidationPipe)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param("cardId") cardId: number) {
    const data = await this.fileService.uploadFile(file, cardId);
    return {
      message: MESSAGES.FILES.CREATE.UPLOAD_SUCCEED,
      data,
    };
  }
}
