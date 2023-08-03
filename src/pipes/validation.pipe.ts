import { Injectable, ArgumentMetadata, ValidationPipe, HttpException } from '@nestjs/common';
import { BadRequestException } from 'src/filter/exceptions';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
   public async transform(value, metadata: ArgumentMetadata) {
      try {
        return await super.transform(value, metadata);
      } catch (e) {
          if (e instanceof HttpException) {
            const { message } = e.getResponse() as { message: string };
            const [head] = message;
            throw new BadRequestException(head);
          }
      }
   }
}