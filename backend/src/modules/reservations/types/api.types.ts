import { HttpStatusCode } from '../../../core/http';
import { Reservation, BasicReservationData } from './reservation.types';

export interface CreateReservationRequest extends Omit<BasicReservationData, 'checkInDate' | 'checkOutDate'> {
  checkInDate: string;
  checkOutDate: string;
}

export interface CreateReservationResponse {
  statusCode: HttpStatusCode.CREATED;
  reservation: Reservation;
}

export interface GetReservationsRequest {
  page?: number | string;
  perPage?: number | string;
}

export interface GetReservationsResponse {
  statusCode: HttpStatusCode.OK;
  page: number;
  perPage: number;
  reservationsTotal: number;
  reservations: ReadonlyArray<Reservation>;
}
