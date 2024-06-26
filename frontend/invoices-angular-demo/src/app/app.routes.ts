import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { PageNotFoundComponent } from './pages/404/pagenotfound.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { States } from './constants';
import { NotImplementedComponent } from './pages/501/not-implemented.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: States.home, component: HomeComponent },
  { path: States.invoices, component: InvoicesComponent },
  { path: `${States.invoice}/:id`, component: InvoiceDetailComponent },
  { path: `${States.invoice}`, component: InvoiceDetailComponent },
  { path: States.about, component: AboutComponent },
  { path: States.profile, component: NotImplementedComponent },
  { path: States.logout, component: NotImplementedComponent },
  { path: '**', component: PageNotFoundComponent },
];

