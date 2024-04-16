import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStateService {
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  public invoices$: Observable<Invoice[]> = this.invoicesSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  loadInvoices(): void {
    this.http
      .get<Invoice[]>(`${baseUrl}/invoices`)
      .subscribe(invoices => { this.invoicesSubject.next(invoices) });
  }

  getAll(): Observable<Invoice[]> {
    return this.http
      .get<Invoice[]>(`${baseUrl}/invoices`)
      .pipe(
        tap(data => console.log('Invoices fetched', data)),
        catchError(error => {
          console.error('Failed to retrieve invoices', error);
          return of([]);
        })
      );
  }
}
