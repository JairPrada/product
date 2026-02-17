import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApplicationsRepository } from './applications.repository';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';
import { Application, ApplicationDocument } from '../schemas';

@Injectable()
export class ApplicationsRepositoryMongo implements ApplicationsRepository {
  constructor(
    @InjectModel(Application.name) private readonly applicationModel: Model<ApplicationDocument>,
  ) {}

  async startApplication(dto: StartApplicationRequestDto): Promise<ApplicationResponseDto> {
    const application = new this.applicationModel({
      documentNumber: dto.documentNumber,
      acceptsDataTreatment: dto.acceptsDataTreatment,
      status: 'pending_otp',
      message: 'OTP enviado al correo registrado',
      productId: dto.productId ? new Types.ObjectId(dto.productId) : undefined,
    });

    const savedApplication = await application.save();
    return this.toResponseDto(savedApplication);
  }

  async getApplicationById(id: string): Promise<ApplicationResponseDto> {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    return this.toResponseDto(application);
  }

  async getApplicationsByDocumentNumber(documentNumber: string): Promise<ApplicationResponseDto[]> {
    const applications = await this.applicationModel.find({ documentNumber }).exec();
    return applications.map(app => this.toResponseDto(app));
  }

  async updateApplicationStatus(
    id: string, 
    status: 'pending_otp' | 'approved' | 'rejected' | 'in_review',
    userId?: string,
  ): Promise<ApplicationResponseDto> {
    const updateData: Record<string, unknown> = { status };
    if (userId) {
      updateData.userId = new Types.ObjectId(userId);
    }

    const application = await this.applicationModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).exec();

    if (!application) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    return this.toResponseDto(application);
  }

  private toResponseDto(application: ApplicationDocument): ApplicationResponseDto {
    return {
      applicationId: application._id.toString(),
      documentNumber: application.documentNumber,
      status: application.status,
      message: application.message || '',
      userId: application.userId?.toString(),
      productId: application.productId?.toString(),
      createdAt: application.get('createdAt') as Date,
    };
  }
}
