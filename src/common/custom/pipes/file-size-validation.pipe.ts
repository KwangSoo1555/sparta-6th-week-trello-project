import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneMb = 150 * 1000 * 1000;
    if (value.size > oneMb) {
      throw new BadRequestException('File size exceeds 150MB');
    }
    return value;
  }
}