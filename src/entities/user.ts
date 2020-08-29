import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity, Unique} from 'typeorm';
import { Role } from './role';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(["email"])
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

    hasPassword(){
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string){
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    // This can fail, in that case remove the underscore of _type
    @ManyToOne(_type => Role, role => role.id)
    userRole: Role;
}
