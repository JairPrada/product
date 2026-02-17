import { ProductResponseDto } from '../../dto';

export abstract class GetProductByIdUseCase {
  abstract execute(id: string): Promise<ProductResponseDto>;
}
