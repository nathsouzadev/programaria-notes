import { Module } from '@nestjs/common';
import { HealthModule } from './core/health/health.module';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
