import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../core/use-cases';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockGetProductsUseCase = { execute: jest.fn() };
  const mockGetProductByIdUseCase = { execute: jest.fn() };
  const mockCreateProductUseCase = { execute: jest.fn() };
  const mockUpdateProductUseCase = { execute: jest.fn() };
  const mockDeleteProductUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: GetProductsUseCase, useValue: mockGetProductsUseCase },
        { provide: GetProductByIdUseCase, useValue: mockGetProductByIdUseCase },
        { provide: CreateProductUseCase, useValue: mockCreateProductUseCase },
        { provide: UpdateProductUseCase, useValue: mockUpdateProductUseCase },
        { provide: DeleteProductUseCase, useValue: mockDeleteProductUseCase },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return array of products', () => {
      const mockProducts: ProductResponseDto[] = [
        {
          id: '1',
          name: 'Test',
          type: 'savings',
          imageSrc: '/test.png',
          balance: '$1,000',
          status: 'active',
        },
      ];

      mockGetProductsUseCase.execute.mockReturnValue(mockProducts);

      const result = controller.getProducts();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return product by id', () => {
      const mockProduct: ProductResponseDto = {
        id: '1',
        name: 'Test',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$1,000',
        status: 'active',
      };

      mockGetProductByIdUseCase.execute.mockReturnValue(mockProduct);

      const result = controller.getProductById('1');

      expect(mockGetProductByIdUseCase.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create product', () => {
      const dto: CreateProductRequestDto = { productId: 'prod-1' };
      const mockProduct: ProductResponseDto = {
        id: 'prod-1',
        name: 'New',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$0',
        status: 'pending',
      };

      mockCreateProductUseCase.execute.mockReturnValue(mockProduct);

      const result = controller.createProduct(dto);

      expect(mockCreateProductUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update product', () => {
      const dto: UpdateProductRequestDto = { name: 'Updated' };
      const mockProduct: ProductResponseDto = {
        id: '1',
        name: 'Updated',
        type: 'savings',
        imageSrc: '/test.png',
        balance: '$1,000',
        status: 'active',
      };

      mockUpdateProductUseCase.execute.mockReturnValue(mockProduct);

      const result = controller.updateProduct('1', dto);

      expect(mockUpdateProductUseCase.execute).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', () => {
      mockDeleteProductUseCase.execute.mockReturnValue(undefined);

      controller.deleteProduct('1');

      expect(mockDeleteProductUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
