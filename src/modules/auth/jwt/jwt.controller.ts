import {
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Headers,
    Ip,
  } from "@nestjs/common";
  
  import { JwtService } from "./jwt.service";
  
  import { JwtRefreshGuards } from "./jwt-strategy.service"
  import { RequestUserByJwt } from "src/common/custom/user-request-jwt"
  
  
  @Controller("auth")
  export class JwtController {
    constructor(private jwtService: JwtService) {}
  
    // @Post("jwt-reissue")
    // @UseGuards(JwtRefreshGuards)
    // @UsePipes(ValidationPipe)
    // tokenReissue(
    //   @RequestUserByJwt() userId: number,
    //   @Headers("authorization") refreshToken: string,
    //   @Ip() ip: string,
    //   @Headers("user-agent") userAgent: string,
    // ) {
    //   console.log(refreshToken)
    //   return this.jwtService.tokenReissue(userId, refreshToken, ip, userAgent);
    // }

    @Post("jwt-reissue")
    @UseGuards(JwtRefreshGuards)
    @UsePipes(ValidationPipe)
    tokenReissue(
      @RequestUserByJwt() user: any,
      @Headers("Authorization") authorization: string,
      @Ip() ip: string,
      @Headers("User-Agent") userAgent: string,
    ) {
      console.log("Authorization Header:", authorization);
      console.log("User ID:", user);
      console.log("Request received");
      const refreshToken = authorization.replace('Bearer ', '');
      // console.log("Refresh Token:", refreshToken);
      return this.jwtService.tokenReissue(user, refreshToken, ip, userAgent);
    }
  }