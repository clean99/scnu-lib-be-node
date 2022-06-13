import { activityStub } from '../test/stubs/activity.stub';

// use jest.fn() to spy on service
export const ActivityService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockReturnValue([activityStub()]),
  findOne: jest.fn().mockReturnValue(activityStub()),
  create: jest.fn().mockReturnValue(activityStub()),
  update: jest.fn().mockReturnValue(activityStub()),
  remove: jest.fn().mockReturnValue(activityStub()),
});
