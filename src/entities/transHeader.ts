import {Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany} from 'typeorm';
import { Trans_Detail } from './transactionDetail';



@Entity()
export class Trans_Header extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        nullable: false
    })
    date: Date;
    
    // This can fail
    @OneToMany(() => Trans_Detail, trans => trans.transHeader)
    headers: Trans_Detail[];
}