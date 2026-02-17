import { Injectable, Logger } from '@nestjs/common';
import { DeleteProductUseCase } from './delete-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';

@Injectable()
export class DeleteProductUseCaseImpl implements DeleteProductUseCase {
  private readonly logger = new Logger(DeleteProductUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Deleting product: ${id}`);
    await this.productsRepository.deleteProduct(id);
  }
}
