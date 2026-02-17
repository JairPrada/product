import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { RegisterUserUseCase } from './core/use-cases';
import { UsersRepository } from './repository';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide RegisterUserUseCase', () => {
    const useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide UsersRepository', () => {
    const repository = module.get<UsersRepository>(UsersRepository);
    expect(repository).toBeDefined();
  });
});
