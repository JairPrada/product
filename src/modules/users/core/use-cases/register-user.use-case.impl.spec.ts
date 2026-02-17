import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCaseImpl } from './register-user.use-case.impl';
import { RegisterUserUseCase } from './register-user.use-case';
import { UsersRepository } from '../../repository/users.repository';
import { RegisterRequestDto, UserResponseDto } from '../../dto';

describe('RegisterUserUseCaseImpl', () => {
  let useCase: RegisterUserUseCase;

  const mockUsersRepository = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RegisterUserUseCase,
          useClass: RegisterUserUseCaseImpl,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call usersRepository.register with correct parameters', async () => {
      const registerDto: RegisterRequestDto = {
        fullName: 'Juan Pérez',
        city: 'Bogotá',
        monthlyIncome: 3500000,
        password: 'SecurePass123!',
      };

      const expectedResponse: UserResponseDto = {
        id: 'user-uuid',
        fullName: 'Juan Pérez',
        city: 'Bogotá',
        createdAt: new Date(),
      };

      mockUsersRepository.register.mockImplementation(() =>
        Promise.resolve(expectedResponse),
      );

      const result = await useCase.execute(registerDto);

      expect(mockUsersRepository.register).toHaveBeenCalledWith(registerDto);
      expect(mockUsersRepository.register).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate repository errors', async () => {
      const registerDto: RegisterRequestDto = {
        fullName: 'Juan Pérez',
        city: 'Bogotá',
        monthlyIncome: 3500000,
        password: 'SecurePass123!',
      };

      const error = new Error('User already exists');
      mockUsersRepository.register.mockImplementation(() =>
        Promise.reject(error),
      );

      await expect(useCase.execute(registerDto)).rejects.toThrow(
        'User already exists',
      );
    });
  });
});
