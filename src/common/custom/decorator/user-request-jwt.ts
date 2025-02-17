// JWT 로 요청한 유저 정보와 토큰을 가져오는 데코레이터

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RequestUserAndToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const authorization = request.headers['authorization'];
    const token = authorization ? authorization.replace('Bearer ', '') : null;
    return { user, token };
  },
);
