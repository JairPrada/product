import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './services';
import { RegisterUserUseCase, RegisterUserUseCaseImpl } from './core/use-cases';
import { UsersRepository, UsersRepositoryMongo } from './repository';
import { User, UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepositoryMongo,
    },
    {
      provide: RegisterUserUseCase,
      useClass: RegisterUserUseCaseImpl,
    },
  ],
  exports: [RegisterUserUseCase, UsersRepository],
})
export class UsersModule {}
