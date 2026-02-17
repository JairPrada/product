/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsRepository } from './products.repository';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';
import { Product, ProductDocument } from '../schemas';

@Injectable()
export class ProductsRepositoryMongo implements ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => this.toResponseDto(product));
  }

  async getProductsByUserId(userId: string): Promise<ProductResponseDto[]> {
    const products = await this.productModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();
    console.log(
      '🚀 ~ ProductsRepositoryMongo ~ getProductsByUserId ~ userId:',
      userId,
    );
    console.log(
      '🚀 ~ ProductsRepositoryMongo ~ getProductsByUserId ~ products:',
      products,
    );
    return products.map((product) => this.toResponseDto(product));
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return this.toResponseDto(product);
  }

  async createProduct(
    dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const accountNumber = this.generateAccountNumber();

    const product = new this.productModel({
      name: dto.name,
      type: dto.type,
      description: dto.description,
      accountNumber,
      balance: dto.balance || '$0',
      limit: dto.limit,
      status: 'pending',
      rate: dto.rate,
      userId: dto.userId ? new Types.ObjectId(dto.userId) : undefined,
    });
    console.log(
      '🚀 ~ ProductsRepositoryMongo ~ createProduct ~ product:',
      product,
    );

    const savedProduct = await product.save();
    return this.toResponseDto(savedProduct);
  }

  async updateProduct(
    id: string,
    dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return this.toResponseDto(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }

  async activateProduct(id: string): Promise<ProductResponseDto> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          $set: { status: 'active', lastMovement: new Date().toLocaleString() },
        },
        { new: true },
      )
      .exec();

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return this.toResponseDto(product);
  }

  private generateAccountNumber(): string {
    const digits = Math.floor(1000 + Math.random() * 9000);
    return `****${digits}`;
  }

  private toResponseDto(product: ProductDocument): ProductResponseDto {
    return {
      id: product._id.toString(),
      name: product.name,
      type: product.type,
      description: product.description,
      accountNumber: product.accountNumber,
      balance: product.balance,
      limit: product.limit,
      status: product.status,
      rate: product.rate,
      lastMovement: product.lastMovement,
      userId: product.userId?.toString(),
      createdAt: product.get('createdAt') as Date,
    };
  }
}
