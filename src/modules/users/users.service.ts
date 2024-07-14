import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ConfigService } from "@nestjs/config";
import { EmailVerificationService } from "src/modules/auth/email/email-verification.service";

import { UsersEntity } from "src/entities/users.entity";
import { RefreshTokensEntity } from "src/entities/refresh-tokens.entity";
import { UsersUpdateDto } from "./users.dto";
import { MESSAGES } from "src/common/constants/messages.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async getUsers(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.password = undefined;
    return user;
  }
}
