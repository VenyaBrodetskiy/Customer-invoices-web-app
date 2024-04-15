import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoadingOn();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastService.showToast(`Error: ${error.headers, error.statusText}`);
        return throwError(() => error)
      }),
      finalize(() => this.loadingService.setLoadingOff())
    )
  }

}