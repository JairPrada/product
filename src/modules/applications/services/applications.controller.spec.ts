import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { StartApplicationUseCase } from '../core/use-cases';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  const mockStartApplicationUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        {
          provide: StartApplicationUseCase,
          useValue: mockStartApplicationUseCase,
        },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('startApplication', () => {
    it('should call startApplicationUseCase.execute and return response', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '1234567890',
        acceptsDataTreatment: true,
      };

      const expectedResponse: ApplicationResponseDto = {
        applicationId: 'app-uuid',
        status: 'pending_otp',
        message: 'OTP enviado',
      };

      mockStartApplicationUseCase.execute.mockReturnValue(expectedResponse);

      const result = controller.startApplication(dto);

      expect(mockStartApplicationUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from use case', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '1234567890',
        acceptsDataTreatment: true,
      };

      mockStartApplicationUseCase.execute.mockImplementation(() => {
        throw new Error('Application failed');
      });

      expect(() => controller.startApplication(dto)).toThrow(
        'Application failed',
      );
    });
  });
});
