import { RegisterRequestDto, UserResponseDto } from '../dto';

export abstract class UsersRepository {
  abstract register(registerDto: RegisterRequestDto): Promise<UserResponseDto>;
  abstract findByDocumentNumber(
    documentNumber: string,
  ): Promise<UserResponseDto>;
  abstract findById(id: string): Promise<UserResponseDto>;
  abstract validateCredentials(
    documentNumber: string,
    password: string,
  ): Promise<UserResponseDto | null>;
}
