import { IsString, IsInt, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
