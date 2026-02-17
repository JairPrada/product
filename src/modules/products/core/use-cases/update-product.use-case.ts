import { UpdateProductRequestDto, ProductResponseDto } from '../../dto';

export abstract class UpdateProductUseCase {
  abstract execute(
    id: string,
    dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto>;
}
