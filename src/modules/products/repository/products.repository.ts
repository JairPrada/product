import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';

export abstract class ProductsRepository {
  abstract getProducts(): Promise<ProductResponseDto[]>;
  abstract getProductsByUserId(userId: string): Promise<ProductResponseDto[]>;
  abstract getProductById(id: string): Promise<ProductResponseDto>;
  abstract createProduct(
    dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto>;
  abstract updateProduct(
    id: string,
    dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto>;
  abstract deleteProduct(id: string): Promise<void>;
  abstract activateProduct(id: string): Promise<ProductResponseDto>;
}
