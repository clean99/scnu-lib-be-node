import { Activity } from '../../../schemas/activity.schema';
import { MockModel } from '../../../utils/testing/mock.model';
import { activityStub } from '../stubs/activity.stub';

export class ActivityModel extends MockModel<Activity> {
  protected entityStub = activityStub();
}
