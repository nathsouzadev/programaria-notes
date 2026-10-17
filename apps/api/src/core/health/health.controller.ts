import { Controller, Get } from '@nestjs/common';
import { HealthStatus } from './models/health.model';
import { HealthService } from './services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthStatus {
    return this.healthService.check();
  }
}
