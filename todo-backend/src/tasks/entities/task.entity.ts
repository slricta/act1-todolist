import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Generate table in database
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;
}
