import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { States } from '../../constants';
import { InvoiceStateService } from '../../services/invoice.service';

@Component({
  selector: 'inv-invoices',
  standalone: true,
  imports: [DatePipe, RouterLink, AsyncPipe],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  public States = States;
  public invoices$ = this.invoiceService.invoices$;

  constructor(private invoiceService: InvoiceStateService) { }

  ngOnInit(): void {
    this.invoiceService.loadInvoices();
  }
}
