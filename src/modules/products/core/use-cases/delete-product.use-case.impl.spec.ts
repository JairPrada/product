import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCaseImpl } from './delete-product.use-case.impl';
import { DeleteProductUseCase } from './delete-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';

describe('DeleteProductUseCaseImpl', () => {
  let useCase: DeleteProductUseCase;

  const mockProductsRepository = {
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DeleteProductUseCase,
          useClass: DeleteProductUseCaseImpl,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call productsRepository.deleteProduct with correct id', () => {
      mockProductsRepository.deleteProduct.mockReturnValue(undefined);

      useCase.execute('1');

      expect(mockProductsRepository.deleteProduct).toHaveBeenCalledWith('1');
      expect(mockProductsRepository.deleteProduct).toHaveBeenCalledTimes(1);
    });

    it('should propagate repository errors', () => {
      mockProductsRepository.deleteProduct.mockImplementation(() => {
        throw new Error('Product not found');
      });

      expect(() => useCase.execute('non-existent')).toThrow(
        'Product not found',
      );
    });
  });
});
