import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity, JoinTable, ManyToMany} from 'typeorm';
import { ProductCategory } from './ProductCategory';
import { Trans_Detail } from './transactionDetail'

@Entity()
 export class Product extends BaseEntity {
    
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
    description: string;

    @Column({
        type: 'number',
        nullable: false
    })
    quantity: number;

    @Column({
        type: 'money',
        nullable: false
    })
    price: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    sellerName: string; 

    // This can fail, in that case remove the underscore of _type
    @ManyToOne(_type => ProductCategory, productCategory => productCategory.id)
    productCategory: ProductCategory;

    @ManyToMany(_type=>Trans_Detail)
    @JoinTable()
    details: Trans_Detail[];
}

export default Product;