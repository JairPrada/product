import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../core/use-cases';
import { LoginRequestDto, LoginResponseDto } from '../dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockLoginUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: mockLoginUseCase,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call loginUseCase.execute and return response', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '1234567890',
        passwordHash: 'hashedPassword',
      };

      const expectedResponse: LoginResponseDto = {
        accessToken: 'jwt-token',
        fullName: 'Test User',
        isRegistered: true,
      };

      mockLoginUseCase.execute.mockImplementation(() =>
        Promise.resolve(expectedResponse),
      );

      const result = await controller.login(loginDto);

      expect(mockLoginUseCase.execute).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from use case', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '1234567890',
        passwordHash: 'hashedPassword',
      };

      mockLoginUseCase.execute.mockImplementation(() =>
        Promise.reject(new Error('Auth failed')),
      );

      await expect(controller.login(loginDto)).rejects.toThrow('Auth failed');
    });
  });
});
