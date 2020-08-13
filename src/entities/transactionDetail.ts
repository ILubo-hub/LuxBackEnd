import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Product } from './product';
import { Trans_Header } from './transHeader';


@Entity()
export class Trans_Detail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'float',
        nullable: false
    })
    subtotal: number;

    @Column({
        type: 'float',
        nullable: false
    })
    discount: number;

    @Column({
        type: 'float',
        nullable: false
    })
    total: number;
    
    // This can fail
    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];

    @ManyToOne(() => Trans_Header, header => header.id)
    transHeader: Trans_Header;
}

export default Trans_Detail;