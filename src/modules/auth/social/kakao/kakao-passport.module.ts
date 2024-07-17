import { Module } from '@nestjs/common';
import { KakaoController } from './kakao-passport.controller';
import { KakaoService } from './kakao-passport.service';

@Module({
  controllers: [KakaoController],
  providers: [KakaoService]
})
export class KakaoPassportModule {}
