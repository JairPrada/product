import { Injectable, Logger } from '@nestjs/common';
import { LoginUseCase } from './login.use-case';
import { AuthRepository } from '../../repository/auth.repository';
import { LoginRequestDto, LoginResponseDto } from '../../dto';

@Injectable()
export class LoginUseCaseImpl implements LoginUseCase {
  private readonly logger = new Logger(LoginUseCaseImpl.name);

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log(`Login attempt for document: ${loginDto.documentNumber}`);
    return this.authRepository.login(loginDto);
  }
}
