import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsModule } from './applications.module';
import { StartApplicationUseCase } from './core/use-cases';
import { ApplicationsRepository } from './repository';

describe('ApplicationsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ApplicationsModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide StartApplicationUseCase', () => {
    const useCase = module.get<StartApplicationUseCase>(
      StartApplicationUseCase,
    );
    expect(useCase).toBeDefined();
  });

  it('should provide ApplicationsRepository', () => {
    const repository = module.get<ApplicationsRepository>(
      ApplicationsRepository,
    );
    expect(repository).toBeDefined();
  });
});
