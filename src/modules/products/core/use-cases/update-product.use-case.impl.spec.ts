import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductUseCaseImpl } from './update-product.use-case.impl';
import { UpdateProductUseCase } from './update-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { UpdateProductRequestDto, ProductResponseDto } from '../../dto';

describe('UpdateProductUseCaseImpl', () => {
  let useCase: UpdateProductUseCase;

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
          provide: UpdateProductUseCase,
          useClass: UpdateProductUseCaseImpl,
        },
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateProductUseCase>(UpdateProductUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call productsRepository.updateProduct with correct parameters', () => {
      const dto: UpdateProductRequestDto = {
        name: 'Updated Name',
        status: 'active',
      };

      const mockProduct: ProductResponseDto = {
        id: '1',
        name: 'Updated Name',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$1,000',
        status: 'active',
      };

      mockProductsRepository.updateProduct.mockReturnValue(mockProduct);

      const result = useCase.execute('1', dto);

      expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(
        '1',
        dto,
      );
      expect(result).toEqual(mockProduct);
    });

    it('should propagate repository errors', () => {
      const dto: UpdateProductRequestDto = {
        name: 'Updated Name',
      };

      mockProductsRepository.updateProduct.mockImplementation(() => {
        throw new Error('Product not found');
      });

      expect(() => useCase.execute('non-existent', dto)).toThrow(
        'Product not found',
      );
    });
  });
});
