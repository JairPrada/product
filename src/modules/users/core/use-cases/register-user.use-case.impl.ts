import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserUseCase } from './register-user.use-case';
import { UsersRepository } from '../../repository/users.repository';
import { RegisterRequestDto, UserResponseDto } from '../../dto';

@Injectable()
export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  private readonly logger = new Logger(RegisterUserUseCaseImpl.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(registerDto: RegisterRequestDto): Promise<UserResponseDto> {
    this.logger.log(`Registering user: ${registerDto.fullName}`);
    return this.usersRepository.register(registerDto);
  }
}
