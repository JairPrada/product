import { LoginRequestDto, LoginResponseDto } from '../dto';

export abstract class AuthRepository {
  abstract login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
}
