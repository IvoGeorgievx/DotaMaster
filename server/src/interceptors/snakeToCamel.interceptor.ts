import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToCamelCase } from 'src/utils/camelCase.transformer';

@Injectable()
export class SnakeToCamelCaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return convertToCamelCase(data);
        }
        return data;
      }),
    );
  }
}
