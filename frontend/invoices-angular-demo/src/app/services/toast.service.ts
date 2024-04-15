import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<string>();

  constructor() { }

  showToast(message: string) {
    this.toastSubject.next(message);
  }

  getToastMessage(): Observable<string> {
    return this.toastSubject.asObservable();
  }
}
