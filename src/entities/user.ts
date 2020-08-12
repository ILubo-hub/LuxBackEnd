import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity} from 'typeorm';
import { Role } from './role';

@Entity()
 export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    lastname: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    // This can fail, in that case remove the underscore of _type
    @ManyToOne(() => Role, role => role.id)
    userRole: Role;
}

export default User;