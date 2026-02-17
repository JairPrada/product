import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCaseImpl } from './create-product.use-case.impl';
import { CreateProductUseCase } from './create-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { CreateProductRequestDto, ProductResponseDto } from '../../dto';

describe('CreateProductUseCaseImpl', () => {
  let useCase: CreateProductUseCase;

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
          provide: CreateProductUseCase,
          useClass: CreateProductUseCaseImpl,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call productsRepository.createProduct with correct dto', () => {
      const dto: CreateProductRequestDto = {
        productId: 'prod-1',
      };

      const mockProduct: ProductResponseDto = {
        id: 'prod-1',
        name: 'New Product',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$0',
        status: 'pending',
      };

      mockProductsRepository.createProduct.mockReturnValue(mockProduct);

      const result = useCase.execute(dto);

      expect(mockProductsRepository.createProduct).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockProduct);
    });
  });
});
