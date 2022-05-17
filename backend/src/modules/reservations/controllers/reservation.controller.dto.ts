import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsNumber, IsNumberString } from 'class-validator';
import { CreateReservationRequest, GetReservationsRequest } from '../types/api.types';

export class CreateReservationDto implements CreateReservationRequest {
  @ApiProperty()
  @IsDateString()
  public checkInDate!: string;

  @ApiProperty()
  @IsDateString()
  public checkOutDate!: string;

  @ApiProperty()
  @IsNumber()
  public guestsAmount!: number;

  @ApiProperty()
  @IsString()
  public firstName!: string;

  @ApiProperty()
  @IsString()
  public lastName!: string;

  @ApiProperty()
  @IsString()
  public country!: string;

  @ApiProperty()
  @IsString()
  public city!: string;

  @ApiProperty()
  @IsString()
  public address!: string;

  @ApiProperty()
  @IsString()
  public postalCode!: string;

  @ApiProperty()
  @IsString()
  public email!: string;

  @ApiProperty()
  @IsString()
  public phone!: string;
}

export class GetReservationsDto implements GetReservationsRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public perPage?: string;
}
