import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity} from 'typeorm';
import { ProductCategory } from './ProductCategory';

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
    @ManyToOne(() => ProductCategory, productCategory => productCategory.id)
    productCategory: ProductCategory;
}

export default Product;