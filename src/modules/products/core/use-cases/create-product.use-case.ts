import { CreateProductRequestDto, ProductResponseDto } from '../../dto';

export abstract class CreateProductUseCase {
  abstract execute(dto: CreateProductRequestDto): Promise<ProductResponseDto>;
}
