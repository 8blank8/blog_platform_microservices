import { Test, TestingModule } from '@nestjs/testing';
import { BlogPlatformReadController } from './blog_platform_read.controller';
import { BlogPlatformReadService } from './blog_platform_read.service';

describe('BlogPlatformReadController', () => {
  let blogPlatformReadController: BlogPlatformReadController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogPlatformReadController],
      providers: [BlogPlatformReadService],
    }).compile();

    blogPlatformReadController = app.get<BlogPlatformReadController>(BlogPlatformReadController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(blogPlatformReadController.getHello()).toBe('Hello World!');
    });
  });
});
