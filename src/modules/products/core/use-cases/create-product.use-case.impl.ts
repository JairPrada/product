import { Injectable, Logger } from '@nestjs/common';
import { CreateProductUseCase } from './create-product.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { CreateProductRequestDto, ProductResponseDto } from '../../dto';

@Injectable()
export class CreateProductUseCaseImpl implements CreateProductUseCase {
  private readonly logger = new Logger(CreateProductUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(dto: CreateProductRequestDto): Promise<ProductResponseDto> {
    this.logger.log(`Creating product: ${dto.name} (${dto.type})`);
    return this.productsRepository.createProduct(dto);
  }
}
