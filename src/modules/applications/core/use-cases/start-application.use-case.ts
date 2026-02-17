import { StartApplicationRequestDto, ApplicationResponseDto } from '../../dto';

export abstract class StartApplicationUseCase {
  abstract execute(dto: StartApplicationRequestDto): Promise<ApplicationResponseDto>;
}
