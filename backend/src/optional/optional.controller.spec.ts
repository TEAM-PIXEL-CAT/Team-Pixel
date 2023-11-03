import { Test, TestingModule } from '@nestjs/testing';
import { OptionalController } from './optional.controller';
import { OptionalService } from './optional.service';

describe('OptionalController', () => {
  let controller: OptionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionalController],
      providers: [OptionalService],
    }).compile();

    controller = module.get<OptionalController>(OptionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
