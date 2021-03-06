import {Column, PrimaryGeneratedColumn, Entity, OneToMany, BaseEntity} from 'typeorm';
import {User} from './user';

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
    @OneToMany(_type => User, user => user.role)
    users: User[];
}

export default Role;