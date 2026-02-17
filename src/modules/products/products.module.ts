import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './services';
import {
  GetProductsUseCase,
  GetProductsUseCaseImpl,
  GetProductByIdUseCase,
  GetProductByIdUseCaseImpl,
  GetProductsByUserIdUseCase,
  GetProductsByUserIdUseCaseImpl,
  CreateProductUseCase,
  CreateProductUseCaseImpl,
  UpdateProductUseCase,
  UpdateProductUseCaseImpl,
  DeleteProductUseCase,
  DeleteProductUseCaseImpl,
} from './core/use-cases';
import { ProductsRepository, ProductsRepositoryMongo } from './repository';
import { Product, ProductSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: ProductsRepository,
      useClass: ProductsRepositoryMongo,
    },
    {
      provide: GetProductsUseCase,
      useClass: GetProductsUseCaseImpl,
    },
    {
      provide: GetProductByIdUseCase,
      useClass: GetProductByIdUseCaseImpl,
    },
    {
      provide: GetProductsByUserIdUseCase,
      useClass: GetProductsByUserIdUseCaseImpl,
    },
    {
      provide: CreateProductUseCase,
      useClass: CreateProductUseCaseImpl,
    },
    {
      provide: UpdateProductUseCase,
      useClass: UpdateProductUseCaseImpl,
    },
    {
      provide: DeleteProductUseCase,
      useClass: DeleteProductUseCaseImpl,
    },
  ],
  exports: [
    GetProductsUseCase,
    GetProductByIdUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductsModule {}
