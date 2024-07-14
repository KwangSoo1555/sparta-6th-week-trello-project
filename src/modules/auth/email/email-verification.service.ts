import nodemailer from "nodemailer";
import { Injectable, HttpStatus } from "@nestjs/common";

import { EmailVerificationDto } from "src/modules/auth/email/email-verification.dto";
import { ENV } from "src/common/constants/env.constant";
import { MESSAGES } from "src/common/constants/messages.constant";
import { AUTH_CONSTANT } from "src/common/constants/auth.constant";

@Injectable()
export class EmailVerificationService {
  smtpTransport = nodemailer.createTransport({
    service: "naver",
    auth: {
      user: ENV.MAIL_AUTH_USER,
      pass: ENV.MAIL_AUTH_PASS,
    },
  });

  private codes = new Map<string, { code: number; timestamp: number }>();
  private expirationTime = 5 * 60 * 1000; // 5분 뒤 코드 인증 만료

  codeNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  codeIssue() {
    return this.codeNumber(111111, 999999);
  }

  isExpired(timestamp: number) {
    return Date.now() > timestamp + this.expirationTime;
  }

  getCode(email: string) {
    return this.codes.get(email);
  }

  async sendAuthEmail(emailVerificationDto: EmailVerificationDto) {
    const verificationCode = this.codeIssue();
    const timestamp = Date.now();
    const email = emailVerificationDto.email;

    const mailOptions = {
      from: AUTH_CONSTANT.AUTH_EMAIL.FROM,
      to: email,
      subject: AUTH_CONSTANT.AUTH_EMAIL.SUBJECT,
      html: `
        <p>${AUTH_CONSTANT.AUTH_EMAIL.HTML}</p> <br>
        <p>인증코드: ${verificationCode}</p>
        `,
    };

    this.codes.set(email, {
      code: verificationCode,
      timestamp,
    });

    await this.smtpTransport.sendMail(mailOptions);

    console.log("code:", this.codes.get(email).code);

    const sendTime = new Date(timestamp).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    return {
      status: HttpStatus.OK,
      message: MESSAGES.AUTH.SIGN_UP.EMAIL.SUCCEED,
      data: {
        code: verificationCode,
        timestamp: sendTime,
      },
    };
  }
}