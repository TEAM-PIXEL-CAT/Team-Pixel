import { Test, TestingModule } from '@nestjs/testing';
import { OptionalService } from './optional.service';

describe('OptionalService', () => {
  let service: OptionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionalService],
    }).compile();

    service = module.get<OptionalService>(OptionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
