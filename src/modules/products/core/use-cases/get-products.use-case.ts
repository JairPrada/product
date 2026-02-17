import { ProductResponseDto } from '../../dto';

export abstract class GetProductsUseCase {
  abstract execute(): Promise<ProductResponseDto[]>;
}
