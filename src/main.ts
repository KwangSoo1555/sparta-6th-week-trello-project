import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { ENV } from "./common/constants/env.constant";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  // 프로젝트 초기 버전 및 start point 설정
  app.setGlobalPrefix("api/v1");

  const port = ENV.SERVER_PORT || 3000;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  
  // 포트로 서버 실행
  try {
    await app.listen(port);
    console.log(`Server is running on: ${port}, Great to see you! 😊`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
