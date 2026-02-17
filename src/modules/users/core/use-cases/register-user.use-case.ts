import { RegisterRequestDto, UserResponseDto } from '../../dto';

export abstract class RegisterUserUseCase {
  abstract execute(registerDto: RegisterRequestDto): Promise<UserResponseDto>;
}
