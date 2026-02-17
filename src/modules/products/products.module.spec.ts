import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from './core/use-cases';
import { ProductsRepository } from './repository';

describe('ProductsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide GetProductsUseCase', () => {
    const useCase = module.get<GetProductsUseCase>(GetProductsUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide GetProductByIdUseCase', () => {
    const useCase = module.get<GetProductByIdUseCase>(GetProductByIdUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide CreateProductUseCase', () => {
    const useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide UpdateProductUseCase', () => {
    const useCase = module.get<UpdateProductUseCase>(UpdateProductUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide DeleteProductUseCase', () => {
    const useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide ProductsRepository', () => {
    const repository = module.get<ProductsRepository>(ProductsRepository);
    expect(repository).toBeDefined();
  });
});
