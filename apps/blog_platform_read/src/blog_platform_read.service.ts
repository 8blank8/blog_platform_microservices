import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogPlatformReadService {
  getHello(): string {
    return 'Hello World!';
  }
}
