import {Column, PrimaryGeneratedColumn, Entity, OneToMany, BaseEntity} from 'typeorm';
import User from './user';

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    description: string;
    
    // This can fail
    @OneToMany(() => User, user => user.userRole)
    users: User[];
}

export default Role;