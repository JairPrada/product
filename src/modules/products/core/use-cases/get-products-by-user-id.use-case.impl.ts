import { Injectable, Logger } from '@nestjs/common';
import { GetProductsByUserIdUseCase } from './get-products-by-user-id.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { ProductResponseDto } from '../../dto';

@Injectable()
export class GetProductsByUserIdUseCaseImpl implements GetProductsByUserIdUseCase {
  private readonly logger = new Logger(GetProductsByUserIdUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(userId: string): Promise<ProductResponseDto[]> {
    this.logger.log(`Fetching products for user: ${userId}`);
    return this.productsRepository.getProductsByUserId(userId);
  }
}
