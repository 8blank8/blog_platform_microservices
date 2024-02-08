import { NestFactory } from '@nestjs/core';
import { BlogPlatformReadModule } from './blog_platform_read.module';

async function bootstrap() {
  const app = await NestFactory.create(BlogPlatformReadModule);
  await app.listen(3001);
}
bootstrap();
