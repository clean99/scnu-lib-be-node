import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { activity } from '../utils/testing/activityTestingData';
import { ActivitySchema } from '../schemas/activity.schema';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/testing/mongoInMemory';
import { ActivityService } from './activity.service';
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
    expect(await service.create(activity)).toHaveProperty('_id');
  });
  it('should find all activity and return', async () => {
    expect(await service.findAll()).toHaveLength(1);
  });
  it('should find a activity by id and return', async () => {
    const myActivity = await service.create(activity);
    expect((await service.findOne(myActivity._id)).title).toEqual(
      myActivity.title,
    );
  });
  it('should remove a activity by id', async () => {
    const myActivity = await service.create(activity);
    expect((await service.remove(myActivity._id)).title).toEqual(
      myActivity.title,
    );
    expect(await service.findOne(myActivity._id)).toBeNull();
  });
  it('should update a activity title', async () => {
    const myActivity = await service.create(activity);
    const oldTitle = myActivity.title;
    const newTitle = 'this is new title.';
    expect(
      (await service.update(myActivity._id, { title: newTitle })).title,
    ).toEqual(oldTitle);
    expect((await service.findOne(myActivity._id)).title).toEqual(newTitle);
  });
  it('should not update an invalid register_date and throw error when register_date early than today', async () => {
    const myActivity = await service.create(activity);
    const oldDate = myActivity.register_date;
    const newDate = '1999-04-30T00:00:00';
    const error =
      'Validation failed: register_date: Validator failed for path `register_date` with value `1999-04-30T00:00:00`';
    await expect(
      service.update(myActivity._id, { register_date: newDate }),
    ).rejects.toThrow(error);
    expect((await service.findOne(myActivity._id)).register_date).toEqual(
      oldDate,
    );
  });
  it('should not update start_date and end_date, and throw error when the order is reverse', async () => {
    const myActivity = await service.create(activity);
    const { start_date: old_start_date, end_date: old_end_date } = myActivity;
    const new_start_date = old_end_date,
      new_end_date = old_start_date;
    await expect(
      service.update(myActivity._id, {
        start_date: new_start_date,
        end_date: new_end_date,
      }),
    ).rejects.toThrow(/(?=.*start_date)(?=.*end_date)/);
    const newActivity = await service.findOne(myActivity._id);
    expect(newActivity.start_date).toEqual(old_start_date);
    expect(newActivity.end_date).toEqual(old_end_date);
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
