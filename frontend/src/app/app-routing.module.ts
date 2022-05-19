import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BookingFormPageComponent } from './pages/booking-form/booking-form.component';

const routes: Routes = [
  {
    path: '',
    component: BookingFormPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
