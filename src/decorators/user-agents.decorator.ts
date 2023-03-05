import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<Request>().get('User-Agent');
  },
);
