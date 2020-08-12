import {Column, PrimaryGeneratedColumn, Entity, OneToMany} from 'typeorm';
import Product from './product';

@Entity()

export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    description: string;
    
    // This can fail, in that case remove the underscore of _type
    @OneToMany(_type => Product, product => product.productCategory)
    products: Product[];
}

export default ProductCategory;
