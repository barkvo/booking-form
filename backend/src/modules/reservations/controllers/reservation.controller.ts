import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { pipe } from 'fp-ts/pipeable';
import * as TE from 'fp-ts/TaskEither';
import { isString } from 'lodash';
import { HttpStatusCode } from '../../../core/http';
import { eitherToPromise } from '../../../core/fp-ts';
import { GetReservationsInput, ReservationService } from '../services/reservation.service';
import { CreateReservationResponse, CreateReservationRequest, GetReservationsResponse, GetReservationsRequest } from '../types/api.types';
import { BasicReservationData } from '../types/reservation.types';
import { CreateReservationDto, GetReservationsDto } from './reservation.controller.dto';

const transformCreateReservationInput = (input: CreateReservationRequest): BasicReservationData => {
  const { checkInDate, checkOutDate, ...otherData } = input;
  return {
    checkInDate: new Date(checkInDate),
    checkOutDate: new Date(checkOutDate),
    ...otherData,
  };
};

const transformGetReservationsInput = ({ page, perPage }: GetReservationsRequest): GetReservationsInput => ({
  page: isString(page) ? parseInt(page, 10) : page,
  perPage: isString(perPage) ? parseInt(perPage, 10) : perPage,
});

@Controller('api/v1/reservations')
export class ReservationController {
  constructor(public readonly reservationService: ReservationService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Reservation created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid reservation data' })
  public async createReservation(@Body() data: CreateReservationDto): Promise<CreateReservationResponse> {
    return eitherToPromise(
      pipe(
        TE.right(transformCreateReservationInput(data)),
        TE.chain((d) => this.reservationService.createReservation(d)),
        TE.map((reservation) => ({
          statusCode: HttpStatusCode.CREATED,
          reservation,
        })),
      ),
    );
  }

  @Get()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Reservations list' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid query data' })
  public async getReservations(@Query() data: GetReservationsDto): Promise<GetReservationsResponse> {
    return eitherToPromise(
      pipe(
        TE.right(transformGetReservationsInput(data)),
        TE.chain((d) => this.reservationService.getReservations(d)),
        TE.map((output) => ({
          statusCode: HttpStatusCode.OK,
          ...output,
        })),
      ),
    );
  }
}
