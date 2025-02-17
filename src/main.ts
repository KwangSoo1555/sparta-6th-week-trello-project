import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix("api/v1");
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>("SERVER_PORT") || 3000;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  try {
    await app.listen(port);
    console.log(`Server is running on: ${port}, Great to see you! 😊`);
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
