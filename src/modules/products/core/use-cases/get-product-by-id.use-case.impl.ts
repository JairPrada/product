import { Injectable, Logger } from '@nestjs/common';
import { GetProductByIdUseCase } from './get-product-by-id.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { ProductResponseDto } from '../../dto';

@Injectable()
export class GetProductByIdUseCaseImpl implements GetProductByIdUseCase {
  private readonly logger = new Logger(GetProductByIdUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<ProductResponseDto> {
    this.logger.log(`Fetching product: ${id}`);
    return this.productsRepository.getProductById(id);
  }
}
