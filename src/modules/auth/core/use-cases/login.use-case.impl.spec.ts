import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginUseCaseImpl } from './login.use-case.impl';
import { LoginUseCase } from './login.use-case';
import { AuthRepository } from '../../repository/auth.repository';
import { LoginRequestDto, LoginResponseDto } from '../../dto';

describe('LoginUseCaseImpl', () => {
  let useCase: LoginUseCase;

  const mockAuthRepository = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LoginUseCase,
          useClass: LoginUseCaseImpl,
        },
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call authRepository.login with correct parameters', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '1234567890',
        passwordHash: 'hashedPassword',
      };

      const expectedResponse: LoginResponseDto = {
        accessToken: 'jwt-token',
        fullName: 'Test User',
        isRegistered: true,
      };

      mockAuthRepository.login.mockImplementation(() =>
        Promise.resolve(expectedResponse),
      );

      const result = await useCase.execute(loginDto);

      expect(mockAuthRepository.login).toHaveBeenCalledWith(loginDto);
      expect(mockAuthRepository.login).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate repository errors', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '1234567890',
        passwordHash: 'hashedPassword',
      };

      const error = new Error('Repository error');
      mockAuthRepository.login.mockImplementation(() => Promise.reject(error));

      await expect(useCase.execute(loginDto)).rejects.toThrow(
        'Repository error',
      );
    });
  });
});
