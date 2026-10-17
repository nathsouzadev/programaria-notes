import { Injectable } from '@nestjs/common';
import { HealthStatus } from '../models/health.model';

@Injectable()
export class HealthService {
  check(): HealthStatus {
    return { status: 'ok' };
  }
}
