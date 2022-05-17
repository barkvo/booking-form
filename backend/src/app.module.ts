import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './config/ormconfig';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ReservationsModule,
  ],
})
export class AppModule {}
