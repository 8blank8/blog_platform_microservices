import { Controller, Get } from '@nestjs/common';
import { BlogPlatformReadService } from './blog_platform_read.service';

@Controller()
export class BlogPlatformReadController {
  constructor(private readonly blogPlatformReadService: BlogPlatformReadService) {}

  @Get()
  getHello(): string {
    return this.blogPlatformReadService.getHello();
  }
}
