import { Component } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { States } from '../../constants';

@Component({
  selector: 'inv-invoices',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  public States = States;
  invoices: Invoice[] = [
    { id: 1, dateIssued: new Date(), status: 'Paid', amount: 200 },
    { id: 2, dateIssued: new Date(), status: 'Pending', amount: 450 },
    { id: 3, dateIssued: new Date(), status: 'Overdue', amount: 150 }
  ];

  // TODO: retrieve from db
}
