import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage, httpStatus } from 'src/global/globalEnum';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  async findAll(): Promise<ResponseData<any>> {
    try {
      const data = await this.profileService.findAll();
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Get all profiles',
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      const data = await this.profileService.update(+id, updateProfileDto);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Update profile successfully',
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const data = await this.profileService.remove(+id);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Profile deleted successfully',
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
}
