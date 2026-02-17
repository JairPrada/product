import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsUseCaseImpl } from './get-products.use-case.impl';
import { GetProductsUseCase } from './get-products.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { ProductResponseDto } from '../../dto';

describe('GetProductsUseCaseImpl', () => {
  let useCase: GetProductsUseCase;

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
          provide: GetProductsUseCase,
          useClass: GetProductsUseCaseImpl,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetProductsUseCase>(GetProductsUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call productsRepository.getProducts and return result', () => {
      const mockProducts: ProductResponseDto[] = [
        {
          id: '1',
          name: 'Test Product',
          type: 'savings',
          imageSrc: '/test.png',
          balance: '$1,000',
          status: 'active',
        },
      ];

      mockProductsRepository.getProducts.mockReturnValue(mockProducts);

      const result = useCase.execute();

      expect(mockProductsRepository.getProducts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });
  });
});
