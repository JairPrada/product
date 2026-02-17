import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginRequestDto, LoginResponseDto } from '../dto';
import { Session, SessionDocument } from '../schemas';
import { UsersRepository } from '../../users/repository';

@Injectable()
export class AuthRepositoryMongo implements AuthRepository {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const user = await this.usersRepository.validateCredentials(
      loginDto.documentNumber,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      sub: user.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      documentNumber: user.documentNumber,
      type: 'access',
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    const session = new this.sessionModel({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      documentNumber: user.documentNumber,
      accessToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      isActive: true,
      userId: user.id,
    });

    await session.save();

    return {
      accessToken,
      isRegistered: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      fullName: user.fullName,
      userId: user.id,
    };
  }
}
