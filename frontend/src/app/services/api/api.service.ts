import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservationRequest, CreateReservationResponse } from '../../types/api.types';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public createReservation(
    { reservationData }:
    { reservationData: CreateReservationRequest }
  ): Promise<CreateReservationResponse> {
    return this.http.post<CreateReservationResponse>('/api/v1/reservations', reservationData).toPromise();
  }
}
