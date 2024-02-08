import { NestFactory } from '@nestjs/core';
import { BlogPlatformWriteModule } from './blog_platform_write.module';
import { OutboxProccesor } from './outbox/outbox.proccesor';


async function bootstrap() {

  const app = await NestFactory.create(BlogPlatformWriteModule);

  // const outboxProccesor = await app.resolve<OutboxProccesor>(OutboxProccesor)
  // await outboxProccesor.sendEventToRabbitMq()

  await app.listen(3000);
}
bootstrap();
