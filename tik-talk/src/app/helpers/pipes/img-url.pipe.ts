import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): string | null {
    return value ? `http://icherniakov.ru/yt-course/${value}` : null;
  }
}
