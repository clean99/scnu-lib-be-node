import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { activity } from '../utils/testing/activityTestingData';
import { ActivitySchema } from '../schemas/activity.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/testing/mongoInMemory';
import { ActivityService } from './activity.service';
import { parse } from 'flatted';
describe('ActivityService', () => {
  let service: ActivityService;
  beforeAll(async () => {
    jest.setTimeout(100000);
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Activity', schema: ActivitySchema },
        ]),
      ],
      providers: [ActivityService],
    }).compile();

    service = moduleRef.get<ActivityService>(ActivityService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create and return a new activity', async () => {
    const result = activity;
    const { _id, createdAt, updatedAt, __v, ...newActivity } = result;
    expect(await service.create(newActivity)).toHaveProperty('_id');
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
