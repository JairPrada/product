import { LoginRequestDto, LoginResponseDto } from '../../dto';

export abstract class LoginUseCase {
  abstract execute(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
}
