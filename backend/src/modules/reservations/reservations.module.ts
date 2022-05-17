import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './controllers/reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './services/reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationsModule {}
