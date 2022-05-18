import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type ReservationId = string & { readonly type: unique symbol };

export interface BasicReservationData {
  checkInDate: Date;
  checkOutDate: Date;
  guestsAmount: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  phone: string;
}

export interface Reservation extends BasicReservationData {
  id: ReservationId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservationRequest extends Omit<BasicReservationData, 'checkInDate' | 'checkOutDate'> {
  checkInDate: string;
  checkOutDate: string;
}


@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public createReservation(
    { reservationData }:
    { reservationData: CreateReservationRequest }
  ) {
    return this.http.post('/api/v1/reservations', reservationData).toPromise();
  }
}
