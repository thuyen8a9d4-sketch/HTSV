import { Body, Controller, Get, Put } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import { Public } from '../../common/decorators/public.decorator';
import { SettingsService } from './settings.service';

class UpdateSettingsDto {
  @IsBoolean()
  monetizationEnabled: boolean;
}

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Public()
  @Get()
  async getPublicSettings() {
    const settings = await this.settingsService.getSettings();
    return { monetizationEnabled: settings.monetizationEnabled };
  }
}

@Controller('admin/settings')
export class SettingsAdminController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  updateSettings(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.setMonetizationEnabled(dto.monetizationEnabled);
  }
}
