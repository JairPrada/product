import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StartApplicationUseCaseImpl } from './start-application.use-case.impl';
import { StartApplicationUseCase } from './start-application.use-case';
import { ApplicationsRepository } from '../../repository/applications.repository';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../../dto';

describe('StartApplicationUseCaseImpl', () => {
  let useCase: StartApplicationUseCase;

  const mockApplicationsRepository = {
    startApplication: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StartApplicationUseCase,
          useClass: StartApplicationUseCaseImpl,
        },
        {
          provide: ApplicationsRepository,
          useValue: mockApplicationsRepository,
        },
      ],
    }).compile();

    useCase = module.get<StartApplicationUseCase>(StartApplicationUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call applicationsRepository.startApplication with correct parameters', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '1234567890',
        acceptsDataTreatment: true,
      };

      const expectedResponse: ApplicationResponseDto = {
        applicationId: 'app-uuid',
        status: 'pending_otp',
        message: 'OTP enviado',
      };

      mockApplicationsRepository.startApplication.mockReturnValue(
        expectedResponse,
      );

      const result = useCase.execute(dto);

      expect(mockApplicationsRepository.startApplication).toHaveBeenCalledWith(
        dto,
      );
      expect(mockApplicationsRepository.startApplication).toHaveBeenCalledTimes(
        1,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate repository errors', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '1234567890',
        acceptsDataTreatment: true,
      };

      mockApplicationsRepository.startApplication.mockImplementation(() => {
        throw new Error('Application error');
      });

      expect(() => useCase.execute(dto)).toThrow('Application error');
    });
  });
});
