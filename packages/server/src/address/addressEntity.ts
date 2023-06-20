import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cameraId: string;

  @Column()
  displayName: string;
}
