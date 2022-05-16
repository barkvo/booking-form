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
  postalCode: number;
  email: string;
  phone: string;
}

export interface Reservation extends BasicReservationData {
  id: ReservationId;
  createdAt: Date;
  updatedAt: Date;
}
