import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

export abstract class ApplicationsRepository {
  abstract startApplication(
    dto: StartApplicationRequestDto,
  ): Promise<ApplicationResponseDto>;

  abstract getApplicationById(id: string): Promise<ApplicationResponseDto>;

  abstract getApplicationsByDocumentNumber(documentNumber: string): Promise<ApplicationResponseDto[]>;

  abstract updateApplicationStatus(
    id: string,
    status: 'pending_otp' | 'approved' | 'rejected' | 'in_review',
    userId?: string,
  ): Promise<ApplicationResponseDto>;
}
