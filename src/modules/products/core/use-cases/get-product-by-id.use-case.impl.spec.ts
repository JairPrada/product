import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { GetProductByIdUseCaseImpl } from './get-product-by-id.use-case.impl';
import { GetProductByIdUseCase } from './get-product-by-id.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { ProductResponseDto } from '../../dto';

describe('GetProductByIdUseCaseImpl', () => {
  let useCase: GetProductByIdUseCase;

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
          provide: GetProductByIdUseCase,
          useClass: GetProductByIdUseCaseImpl,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductByIdUseCase>(GetProductByIdUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call productsRepository.getProductById with correct id', () => {
      const mockProduct: ProductResponseDto = {
        id: '1',
        name: 'Test Product',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$1,000',
        status: 'active',
      };

      mockProductsRepository.getProductById.mockReturnValue(mockProduct);

      const result = useCase.execute('1');

      expect(mockProductsRepository.getProductById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProduct);
    });

    it('should propagate repository errors', () => {
      mockProductsRepository.getProductById.mockImplementation(() => {
        throw new Error('Product not found');
      });

      expect(() => useCase.execute('non-existent')).toThrow(
        'Product not found',
      );
    });
  });
});
