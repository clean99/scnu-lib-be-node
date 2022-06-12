import { Activity } from '../../../schemas/activity.schema';

export const activityStub = (): Activity => ({
    activity_id:  "562550b9-318f-48aa-8b90-8c8e759e55a8",
    title: 'string',
    register_date: '2023-04-30T00:00:00',
    start_date: '2023-05-30T00:00:00',
    end_date: '2023-06-30T00:00:00',
    img: 'http://www.baidu.com',
    description: 'this is a activity.',
    max_num_of_people: 1,
    num_of_people: 0,
    spot: 'scnu',
    tags: [0, 1, 2],
    hosts: [ "562550b9-318f-48aa-8b90-8c8e759e55a8"],
    is_allow_volunteer: true,
    is_delete: false,
    applicant_people: [],
    volunteer: [],
  })