import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { FilesEntity } from "src/entities/files.entity";
import { CardsEntity } from "src/entities/cards.entity";
import { MESSAGES } from "src/common/constants/messages.constant";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileService {
  private readonly s3: S3Client;

  constructor(
    @InjectRepository(FilesEntity)
    private readonly fileRepository: Repository<FilesEntity>,
    @InjectRepository(CardsEntity)
    private readonly cardRepository: Repository<CardsEntity>,
    private configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: configService.get("AWS_S3_REGION"),
      credentials: {
        accessKeyId: configService.get("AWS_S3_ACCESS_KEY"),
        secretAccessKey: configService.get("AWS_S3_SECRET_KEY"),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, cardId: number) {
    const cardCheck = await this.cardRepository.findOne({ where: { id: cardId } });
    if (!cardCheck) {
      throw new BadRequestException(MESSAGES.CARD.NOT_CARD.CARD_NOT_FOUND);
    }
    const command = new PutObjectCommand({
      Bucket: this.configService.get("AWS_BUCKET"),
      Key: file.originalname,
      Body: file.buffer,
    });

    this.s3.send(command);

    return this.fileRepository.save({
      cardId: cardId,
      title: file.originalname,
      fileUrl: `https://${this.configService.get("AWS_BUCKET")}.s3.${this.configService.get("AWS_S3_REGION")}.amazonaws.com/${file.originalname}`,
    });
  }

  async fileDelete(cardId: number, fileId: number) {
    const data = await this.fileRepository.findOne({ where: { cardId, id: fileId } });
    if (!data) {
      throw new BadRequestException(MESSAGES.FILES.NOT_EXISTS);
    }

    this.fileRepository.delete(data.id);
  }
}
