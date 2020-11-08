import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //To use the class-transform globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
