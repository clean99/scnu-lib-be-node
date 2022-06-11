import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    description: 'title',
  })
  title: string; // 0<length<30
  @ApiProperty({
    description: 'register_date',
    default: '2022-03-30T00:00:00',
  })
  register_date: string; // after today
  @ApiProperty({
    description: 'start_date',
    default: '2022-03-30T00:00:00',
  })
  start_date: string; // after register_date
  @ApiProperty({
    description: 'end_date',
    default: '2022-03-30T00:00:00',
  })
  end_date: string; // after start_date
  @ApiProperty({
    description: 'description',
    default: 'this is a activity.',
  })
  description: string; // 0<length<400
  @ApiProperty({
    description: 'img',
    default: 'http://www.baidu.com',
  })
  img: string; // url
  @ApiProperty({
    description: 'num_of_people',
    default: 0,
  })
  num_of_people: number; // 0<=num
  @ApiProperty({
    description: 'max_num_of_people',
    default: 0,
  })
  max_num_of_people: number; // 0<num
  @ApiProperty({
    description: 'spot',
    default: 'scnu',
  })
  spot: string;
  @ApiProperty({
    description: 'tags',
    default: [0, 1, 2],
  })
  tags: number[]; // 映射到Act_Tag表
  @ApiProperty({
    description: 'hosts',
    default: ['624e70bc1e172b1241a0b3ba'],
  })
  hosts: string[]; // 主持人
  @ApiProperty({
    description: 'is_allow_volunteer',
    default: true,
  })
  is_allow_volunteer: boolean; // 是否开启志愿者报名
  @ApiProperty({
    description: 'is_delete',
    default: false,
  })
  is_delete: boolean; // 活动是否已被取消
}
