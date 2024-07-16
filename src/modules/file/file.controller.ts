import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "src/common/custom/pipes/file-size-validation.pipe";
import { MESSAGES } from "src/common/constants/messages.constant";
import { JwtAccessGuards } from "../auth/jwt/jwt-strategy.service";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(":filename")
  getFile(@Param("filename") filename: string) {
    return "Method not implemented.";
  }

  @Post(":cardId")
  @UseGuards(JwtAccessGuards)
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(FileSizeValidationPipe)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param("cardId") cardId: number) {
    const data = await this.fileService.uploadFile(file, cardId);
    return {
      message: MESSAGES.FILES.CREATE.UPLOAD_SUCCEED,
      data,
    };
  }

  @Delete(":cardId/:fileId")
  @UseGuards(JwtAccessGuards)
  async fileDelete(@Param("cardId") cardId: number, @Param("fileId") fileId: number) {
    await this.fileService.fileDelete(cardId, fileId);
    return { message: MESSAGES.FILES.DELETE.DELETE_SUCCEED };
  }
}
