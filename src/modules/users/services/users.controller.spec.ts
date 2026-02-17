import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { RegisterUserUseCase } from '../core/use-cases';
import { RegisterRequestDto, UserResponseDto } from '../dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockRegisterUserUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: mockRegisterUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call registerUserUseCase.execute and return response', async () => {
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

      mockRegisterUserUseCase.execute.mockImplementation(() =>
        Promise.resolve(expectedResponse),
      );

      const result = await controller.register(registerDto);

      expect(mockRegisterUserUseCase.execute).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from use case', async () => {
      const registerDto: RegisterRequestDto = {
        fullName: 'Juan Pérez',
        city: 'Bogotá',
        monthlyIncome: 3500000,
        password: 'SecurePass123!',
      };

      mockRegisterUserUseCase.execute.mockImplementation(() =>
        Promise.reject(new Error('Registration failed')),
      );

      await expect(controller.register(registerDto)).rejects.toThrow(
        'Registration failed',
      );
    });
  });
});
