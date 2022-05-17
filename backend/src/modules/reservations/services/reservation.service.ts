import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Apply from 'fp-ts/Apply';
import { pipe } from 'fp-ts/pipeable';
import * as TE from 'fp-ts/TaskEither';
import { Repository } from 'typeorm';
import { eitherifyTypeormRepository, RepositoryEither } from '../../../core/fp-ts';
import { Reservation as ReservationEntity } from '../entities/reservation.entity';
import { BasicReservationData, Reservation } from '../types/reservation.types';

type CreateReservation = (i: BasicReservationData) => TE.TaskEither<Error, Reservation>;

export interface GetReservationsInput {
  page?: number;
  perPage?: number;
}

interface GetReservationsResult {
  page: number;
  perPage: number;
  reservationsTotal: number;
  reservations: ReadonlyArray<Reservation>;
}

type GetReservations = (i: GetReservationsInput) => TE.TaskEither<Error, GetReservationsResult>;

type CalculatePagination = (i: { page: number; perPage: number; }) => { skip: number; take: number };

const calculatePagination: CalculatePagination = ({ page, perPage }) => ({
  skip: page === 1 ? 0 : (page - 1) * perPage,
  take: perPage,
});

@Injectable()
export class ReservationService {
  private readonly eitherifiedReservationRepository: RepositoryEither<BasicReservationData, ReservationEntity>;

  constructor(
    @InjectRepository(ReservationEntity)
    readonly reservationRepository: Repository<ReservationEntity>,
  ) {
    this.eitherifiedReservationRepository = eitherifyTypeormRepository(reservationRepository);
  }

  public createReservation: CreateReservation = (reservationData) => {
    return pipe(
      TE.fromEither(this.eitherifiedReservationRepository.create(reservationData)),
      TE.chainFirst((d) => this.eitherifiedReservationRepository.insert(d)),
      TE.chain((word) => TE.right(word)),
    );
  };

  public getReservations: GetReservations = ({ page = 1, perPage = 25 }) => {
    return pipe(
      Apply.sequenceS(TE.taskEither)({
        reservations: this.eitherifiedReservationRepository.findByManyOptions(
          calculatePagination({ page, perPage }),
        ),
        reservationsTotal: this.eitherifiedReservationRepository.count(),
      }),
      TE.map(({ reservations, reservationsTotal }) => ({
        reservations,
        reservationsTotal,
        page,
        perPage,
      })),
    );
  };
}
