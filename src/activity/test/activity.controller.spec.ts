import { Test } from "@nestjs/testing"
import { Activity } from "src/schemas/activity.schema";
import { ActivityController } from "../activity.controller"
import { ActivityService } from "../activity.service"
import { CreateActivityDto } from "../dto/create-activity.dto";
import { UpdateActivityDto } from "../dto/update-activity.dto";
import { activityStub } from "./stubs/activity.stub";

jest.mock('../activity.service');

describe('ActivityController', () => {
    let activityController: ActivityController;
    let activityService: ActivityService;
    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [ActivityController],
            providers: [ActivityService]
        }).compile();
        activityController = moduleRef.get<ActivityController>(ActivityController);
        activityService = moduleRef.get<ActivityService>(ActivityService);
        jest.clearAllMocks();
    })

    describe('findOne', () => {
        describe('when findOne called', () => {
            let activity : Activity;
            const activityMock = activityStub();
    
            beforeEach(async () => {
                activity = await activityController.findOne(activityMock.activity_id);
            })
    
            it('should call activityService', () => {
                expect(activityService.findOne).toBeCalledWith(activityMock.activity_id);
            })
            
            it('should return a activity', () => {
                expect(activity).toEqual(activityMock);
            })
        })
    })

    describe('findAll', () => {
        describe('when findAll called', () => {
            let activities: Activity[];
            const activitiesMock = [activityStub()];

            beforeEach(async () => {
                activities = await activityController.findAll();
            })

            it('should call activityService', () => {
                expect(activityService.findAll).toBeCalled();
            })

            it('Should return a activities array', () => {
                expect(activities).toEqual(activitiesMock);
            })
        })
    })

    describe('create', () => {
        describe('when create called', () => {
            let activity: Activity;
            const activityMock = activityStub();
            const activityDto: CreateActivityDto = {
                ...activityMock
            };

            beforeEach(async () => {
                activity = await activityController.create(activityDto)
            })

            it('should call activityService', () => {
                expect(activityService.create).toBeCalledWith(activityDto)
            })

            it('should return a activity', () => {
                expect(activity).toEqual(activityMock);
            })
        })
    })

    describe('update', () => {
        describe('when update called', () => {
            let activity: Activity;
            const activityMock = activityStub();
            const activityDto: UpdateActivityDto = {
                ...activityMock
            };

            beforeEach(async () => {
                activity = await activityController.update(activityMock.activity_id, activityDto)
            })

            it('should call activityService', () => {
                expect(activityService.update).toBeCalledWith(activityMock.activity_id, activityDto)
            })

            it('should return a activity', () => {
                expect(activity).toEqual(activityMock);
            })
        })
    })

    describe('remove', () => {
        describe('when remove called', () => {
            let activity: Activity;
            const activityMock = activityStub();

            beforeEach(async () => {
                activity = await activityController.remove(activityMock.activity_id)
            })

            it('should call activityService', () => {
                expect(activityService.remove).toBeCalledWith(activityMock.activity_id)
            })

            it('should return a activity', () => {
                expect(activity).toEqual(activityMock);
            })
        })
    })
})