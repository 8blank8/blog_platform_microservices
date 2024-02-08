import { Module } from '@nestjs/common';
import { BlogPlatformReadController } from './blog_platform_read.controller';
import { BlogPlatformReadService } from './blog_platform_read.service';
import { RbMq } from 'libs/rabbitmq/rabbitmq.module';
import { RabbitConsumer } from '../rabbitmq.consumer';

@Module({
  imports: [RbMq.forRoot({
    exchangesName: 'blog_platform',
  })],
  controllers: [BlogPlatformReadController],
  providers: [BlogPlatformReadService, RabbitConsumer],
})
export class BlogPlatformReadModule { }
