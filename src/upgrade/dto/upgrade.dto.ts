import { IsNotEmpty } from 'class-validator';

export class PostCreateUpgrade {
  @IsNotEmpty() upgradeLevel: number;
  @IsNotEmpty() type: string;
  @IsNotEmpty() description: string;
  @IsNotEmpty() numberOrPercent: number;
  @IsNotEmpty() isPercent: boolean;
  @IsNotEmpty() coinCost: number;
}

export class LevelUpUpgrade {}
