import { ProductResponseDto } from '../../dto';

export abstract class GetProductsByUserIdUseCase {
  abstract execute(userId: string): Promise<ProductResponseDto[]>;
}
