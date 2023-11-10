import { IsNotEmpty } from 'class-validator';

export class PostCreatePet {
  @IsNotEmpty() name: string;
  @IsNotEmpty() star: number;
  @IsNotEmpty() atk: number;
  @IsNotEmpty() cooldown: number;
  @IsNotEmpty() atkBuff: number;
  @IsNotEmpty() critBuff: number;
  @IsNotEmpty() speedRunBuff: number;
  @IsNotEmpty() speedAttachBuff: number;
  @IsNotEmpty() hpBuff: number;
  @IsNotEmpty() dameCritBuff: number;
  @IsNotEmpty() armorBuff: number;
}
