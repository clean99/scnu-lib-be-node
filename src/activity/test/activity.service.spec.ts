import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Activity } from '../../schemas/activity.schema';
import { ActivityService } from '../activity.service';
import { activityStub } from './stubs/activity.stub';
import { ActivityModel } from './support/mock.model';
import { FilterQuery } from 'mongoose';

describe('ActivityService', () => {
  let activityModel: ActivityModel;
  let activityService: ActivityService;
  let activityFilterQuery: FilterQuery<Activity>;
  const activityMock = activityStub();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getModelToken(Activity.name),
          useClass: ActivityModel,
        },
      ],
    }).compile();

    activityService = moduleRef.get<ActivityService>(ActivityService);
    activityModel = moduleRef.get<ActivityModel>(getModelToken(Activity.name));

    activityFilterQuery = {
      activity_id: activityMock.activity_id,
    };

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let activity: Activity;

      beforeEach(async () => {
        jest.spyOn(activityModel, 'findOne');
        activity = await activityService.findOne(
          activityFilterQuery.activity_id,
        );
      });

      it('should call activityModel', () => {
        expect(activityModel.findOne).toBeCalledWith(activityFilterQuery);
      });

      it('should return an activity', () => {
        expect(activity).toEqual(activityMock);
      });
    });
  });

  describe('findAll', () => {
    let activities: Activity[];

    beforeEach(async () => {
      jest.spyOn(activityModel, 'find');
      activities = await activityService.findAll();
    });

    it('should call activityModel', () => {
      expect(activityModel.find).toBeCalled();
    });

    it('should return an activities array', () => {
      expect(activities).toEqual([activityMock]);
    });
  });

  describe('create', () => {
    let activity: Activity;

    beforeEach(async () => {
      jest.spyOn(activityModel, 'create');
      activity = await activityService.create(activityMock);
    });

    it('should call activityModel', () => {
      expect(activityModel.create).toBeCalled();
    });

    it('should return an activity', () => {
      expect(activity).toEqual(activityMock);
    });
  });

  describe('update', () => {
    let activity: Activity;

    beforeEach(async () => {
      jest.spyOn(activityModel, 'findOneAndUpdate');
      activity = await activityService.update(
        activityFilterQuery.activity_id,
        activityMock,
      );
    });

    it('should call activityModel', () => {
      expect(activityModel.findOneAndUpdate).toBeCalledWith(
        activityFilterQuery,
        activityMock,
        {
          runValidators: true,
        },
      );
    });

    it('should return an activity', () => {
      expect(activity).toEqual(activityMock);
    });
  });

  describe('delete', () => {
    let activity: Activity;

    beforeEach(async () => {
      jest.spyOn(activityModel, 'findOneAndDelete');
      activity = await activityService.remove(activityFilterQuery.activity_id);
    });

    it('should call activityModel', () => {
      expect(activityModel.findOneAndDelete).toBeCalledWith(
        activityFilterQuery,
      );
    });

    it('should return an activity', () => {
      expect(activity).toEqual(activityMock);
    });
  });
});
