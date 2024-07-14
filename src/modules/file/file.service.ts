import { Injectable } from "@nestjs/common";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { ENV } from "src/common/constants/env.constant";
import { FileEntity } from "src/entities/file.entity";
import { CardEntity } from "src/entities/card.entity";
import { MESSAGES } from "src/common/constants/message.constant";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileService {
  getFile(filename: string) {
    throw new Error("Method not implemented.");
  }
}
