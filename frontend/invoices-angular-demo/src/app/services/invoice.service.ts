import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${baseUrl}/invoices`);
  }
}
