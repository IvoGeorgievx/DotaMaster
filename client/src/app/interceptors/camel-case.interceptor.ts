// import {
//   HttpRequest,
//   HttpHandlerFn,
//   HttpEvent,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export function snakeToCamelInterceptor(
//   req: HttpRequest<any>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<any>> {
//   return next(req).pipe(
//     map((event) => {
//       if (event instanceof HttpResponse) {
//         return event.clone({ body: convertToCamelCase(event.body) });
//       }
//       return event;
//     })
//   );
// }

// function convertToCamelCase(obj: any): any {
//   if (Array.isArray(obj)) {
//     return obj.map((item) => convertToCamelCase(item));
//   } else if (obj && typeof obj === 'object') {
//     return Object.keys(obj).reduce((acc, key) => {
//       const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
//         letter.toUpperCase()
//       );
//       acc[camelKey] = convertToCamelCase(obj[key]);
//       return acc;
//     }, {} as any);
//   }
//   return obj;
// }
