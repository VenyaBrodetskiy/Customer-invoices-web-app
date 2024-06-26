import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Invoice, NewInvoice } from '../models/invoice.model';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStateService {
  private invoicesSubject$ = new BehaviorSubject<Invoice[]>([]);
  public invoices$: Observable<Invoice[]> = this.invoicesSubject$.asObservable();

  constructor(private http: HttpClient) { }
  
  loadInvoices(): void {
    this.http
      .get<Invoice[]>(`${baseUrl}/invoices`)
      .pipe(
        catchError(error => {
          console.error('Failed to load invoices', error);
          return of([]);
        })
      )
      .subscribe(invoices => { this.invoicesSubject$.next(invoices) });
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

  getById(id: number): Observable<Invoice | undefined> {
    const invoices: Invoice[] = this.invoicesSubject$.getValue();

    if (invoices.length !== 0) {
      return this.invoices$.pipe(
        map(invoices => invoices.find(invoice => invoice.id === id))
      );
    } else {
      return this.http
        .get<Invoice>(`${baseUrl}/invoices/${id}`)
        .pipe(
          tap(data => console.log('Invoices fetched', data)),
          catchError(error => {
            console.error('Failed to retrieve invoices', error);
            return of();
          })
        );
    }
  }

  updateInvoice(invoice: Invoice): void {
    this.http
      .patch<Invoice>(`${baseUrl}/invoices`, invoice)
      .pipe(
        tap(updatedInvoice => {
          const invoices = this.invoicesSubject$.getValue();
          const index = invoices.findIndex(inv => inv.id === updatedInvoice.id);
          if (index > -1) {
            invoices[index] = updatedInvoice;
            this.invoicesSubject$.next(invoices)
          }
        }),
        catchError(error => {
          console.error('Failed to update invoice', error);
          return of(null);
        })
      )
      .subscribe();
  }

  createInvoice(invoice: NewInvoice): void {
    this.http
      .post<Invoice>(`${baseUrl}/invoices1`, invoice)
      .pipe(
        tap(invoice => {
          const invoices = this.invoicesSubject$.getValue();
          invoices.unshift(invoice);
        }),
        catchError(error => {
          console.error('Failed to create invoice', error);
          return of(null);
        })
      )
      .subscribe();
  }
}
