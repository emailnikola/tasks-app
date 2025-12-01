import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  MinLength,
  MaxLength
} from 'class-validator'

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus

  @IsUUID()
  userId!: string
}
