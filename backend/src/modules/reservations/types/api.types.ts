import { HttpStatusCode } from '../../../core/http';
import { Reservation, BasicReservationData } from './reservation.types';

export type CreateReservationRequest = BasicReservationData;

export interface CreateReservationResponse {
  status: HttpStatusCode.CREATED;
  reservation: Reservation;
}

export interface GetReservationsRequest {
  page: number;
  perPage: number;
}

export interface GetReservationsResponse {
  page: number;
  perPage: number;
  reservationsTotal: number;
  reservations: ReadonlyArray<Reservation>;
}
