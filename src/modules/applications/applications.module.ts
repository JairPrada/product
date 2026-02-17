import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './services';
import {
  StartApplicationUseCase,
  StartApplicationUseCaseImpl,
} from './core/use-cases';
import {
  ApplicationsRepository,
  ApplicationsRepositoryMongo,
} from './repository';
import { Application, ApplicationSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }]),
  ],
  controllers: [ApplicationsController],
  providers: [
    {
      provide: ApplicationsRepository,
      useClass: ApplicationsRepositoryMongo,
    },
    {
      provide: StartApplicationUseCase,
      useClass: StartApplicationUseCaseImpl,
    },
  ],
  exports: [StartApplicationUseCase],
})
export class ApplicationsModule {}
