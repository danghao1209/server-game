import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UpgradeModule } from 'src/upgrade/upgrade.module';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [UpgradeModule, PetModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
