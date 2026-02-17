import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { LoginUseCase } from './core/use-cases';
import { AuthRepository } from './repository';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide LoginUseCase', () => {
    const useCase = module.get<LoginUseCase>(LoginUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide AuthRepository', () => {
    const repository = module.get<AuthRepository>(AuthRepository);
    expect(repository).toBeDefined();
  });
});
