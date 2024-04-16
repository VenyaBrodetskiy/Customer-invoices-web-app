import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { States } from '../../constants';
import { InvoiceStateService } from '../../services/invoice.service';

@Component({
  selector: 'inv-invoices',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  public States = States;
  invoices: Invoice[] = []

  constructor(private invoiceService: InvoiceStateService) { }

  ngOnInit(): void {
    this.invoiceService.getAll()
      .subscribe(invoices => { this.invoices = invoices })
  }
}
