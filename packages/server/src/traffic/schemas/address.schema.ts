import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop()
  cameraId: string;

  @Prop()
  displayName: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
