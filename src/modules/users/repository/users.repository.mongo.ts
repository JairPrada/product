import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { RegisterRequestDto, UserResponseDto } from '../dto';
import { User, UserDocument } from '../schemas';

@Injectable()
export class UsersRepositoryMongo implements UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(registerDto: RegisterRequestDto): Promise<UserResponseDto> {
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const existingUser = await this.userModel
      .findOne({
        documentNumber: registerDto.documentNumber,
      })
      .exec();

    if (existingUser) {
      existingUser.passwordHash = passwordHash;
      const updatedUser = await existingUser.save();
      return this.toResponseDto(updatedUser);
    }

    const user = new this.userModel({
      documentNumber: registerDto.documentNumber,
      fullName: registerDto.fullName,
      email: registerDto.email,
      city: registerDto.city,
      monthlyIncome: registerDto.monthlyIncome,
      passwordHash,
      isActive: true,
    });

    const savedUser = await user.save();

    return this.toResponseDto(savedUser);
  }

  async findByDocumentNumber(documentNumber: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ documentNumber }).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.toResponseDto(user);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.toResponseDto(user);
  }

  async validateCredentials(
    documentNumber: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.userModel
      .findOne({
        documentNumber,
        isActive: true,
      })
      .exec();

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    return isPasswordValid ? this.toResponseDto(user) : null;
  }

  private toResponseDto(user: UserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      documentNumber: user.documentNumber,
      fullName: user.fullName,
      email: user.email,
      city: user.city,
      monthlyIncome: user.monthlyIncome,
      isActive: user.isActive,
      createdAt: user.get('createdAt') as Date,
    };
  }
}
