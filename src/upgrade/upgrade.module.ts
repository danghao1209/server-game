import { Module } from '@nestjs/common';
import { UpgradeService } from './upgrade.service';
import { UpgradeController } from './upgrade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upgrade, UpgradeSchema } from './schema/upgrade.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upgrade.name, schema: UpgradeSchema }]),
    UserModule,
  ],
  providers: [UpgradeService],
  controllers: [UpgradeController],
  exports: [UpgradeService],
})
export class UpgradeModule {}
