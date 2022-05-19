import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { times } from 'lodash';
import { Repository } from 'typeorm';
import { eitherToPromise } from '../../../core/fp-ts';
import { Reservation as ReservationEntity } from '../entities/reservation.entity';
import { Reservation, ReservationId, BasicReservationData } from '../types/reservation.types';
import { calculatePagination, ReservationService } from './reservation.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const createRepositoryMock = (): MockType<Repository<ReservationEntity>> => ({
  create: jest.fn(),
  insert: jest.fn(() => Promise.resolve()),
  find: jest.fn(() => Promise.resolve()),
  count: jest.fn(() => Promise.resolve()),
});

const basicReservationMock: BasicReservationData = {
  checkInDate: new Date('2022-05-17T08:56:13.868Z'),
  checkOutDate: new Date('2022-05-17T08:56:13.868Z'),
  guestsAmount: 0,
  firstName: 'string',
  lastName: 'string',
  country: 'string',
  city: 'string',
  address: 'string',
  postalCode: 'string',
  email: 'string',
  phone: 'string',
};

const reservationMock: Reservation = {
  ...basicReservationMock,
  id: 'df6527fd-7e3d-4494-a26b-d341aee81edf' as ReservationId,
  createdAt: new Date('2022-05-17T09:06:59.311Z'),
  updatedAt: new Date('2022-05-17T09:06:59.311Z'),
};

// test calculatePagination!

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: MockType<Repository<ReservationEntity>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: getRepositoryToken(ReservationEntity), useValue: createRepositoryMock() },
      ],
    }).compile();
    service = await moduleRef.resolve<ReservationService>(ReservationService);
    repository = await moduleRef.resolve(getRepositoryToken(ReservationEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create reservation', async () => {
    const createListener = jest.spyOn(repository, 'create');
    createListener.mockImplementation(() => reservationMock);
    const insertListener = jest.spyOn(repository, 'insert');
    let result;
    let error;
    try {
      result = await eitherToPromise(service.createReservation(basicReservationMock));
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
    expect(createListener).toBeCalledWith(basicReservationMock);
    expect(insertListener).toBeCalledWith(reservationMock);
    expect(result).toEqual(reservationMock);
  });

  it('should return reservations', async () => {
    const findListener = jest.spyOn(repository, 'find');
    const reservations = times(10, () => reservationMock);
    findListener.mockImplementation(async () => reservations);
    const countListener = jest.spyOn(repository, 'count');
    const reservationsTotal = 42;
    countListener.mockImplementation(async () => reservationsTotal);
    const input = { page: 5, perPage: 20 };
    let result;
    let error;
    try {
      result = await eitherToPromise(service.getReservations(input));
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
    expect(findListener).toBeCalledWith(calculatePagination(input));
    expect(countListener).toBeCalledWith(undefined);
    expect(result).toEqual({
      reservations,
      reservationsTotal,
      page: input.page,
      perPage: input.perPage,
    });
  });
});

describe('calculatePagination', () => {
  it('should calculate pagination correctly', () => {
    expect(calculatePagination({ page: 1, perPage: 10 })).toEqual({ skip: 0, take: 10 });
    expect(calculatePagination({ page: 10, perPage: 100 })).toEqual({ skip: 900, take: 100 });
  });
});
