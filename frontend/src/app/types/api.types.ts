import { HttpStatusCode } from './http.types';
import { Reservation, BasicReservationData } from './reservation.types';

export interface CreateReservationRequest extends Omit<BasicReservationData, 'checkInDate' | 'checkOutDate'> {
  checkInDate: string;
  checkOutDate: string;
}

export interface CreateReservationResponse {
  statusCode: HttpStatusCode
  reservation: Reservation;
}