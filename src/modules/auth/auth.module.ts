import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './services';
import { LoginUseCase, LoginUseCaseImpl } from './core/use-cases';
import { AuthRepository, AuthRepositoryMongo } from './repository';
import { Session, SessionSchema } from './schemas';
import { UsersModule } from '../users';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default-secret-key',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryMongo,
    },
    {
      provide: LoginUseCase,
      useClass: LoginUseCaseImpl,
    },
  ],
  exports: [LoginUseCase],
})
export class AuthModule {}
