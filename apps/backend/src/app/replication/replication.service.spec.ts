import { Test, TestingModule } from '@nestjs/testing';
import { ReplicationService } from './replication.service';

describe('ReplicationService', () => {
  let service: ReplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplicationService],
    }).compile();

    service = module.get<ReplicationService>(ReplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
