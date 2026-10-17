import { Test } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get(HealthService);
  });

  describe('check', () => {
    it('should return status ok', () => {
      expect(service.check()).toMatchObject({ status: 'ok' });
    });
  });
});
