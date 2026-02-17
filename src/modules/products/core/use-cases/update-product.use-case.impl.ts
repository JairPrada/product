import { Injectable, Logger } from '@nestjs/common';
import { UpdateProductUseCase } from './update-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { UpdateProductRequestDto, ProductResponseDto } from '../../dto';

@Injectable()
export class UpdateProductUseCaseImpl implements UpdateProductUseCase {
  private readonly logger = new Logger(UpdateProductUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string, dto: UpdateProductRequestDto): Promise<ProductResponseDto> {
    this.logger.log(`Updating product: ${id}`);
    return this.productsRepository.updateProduct(id, dto);
  }
}
