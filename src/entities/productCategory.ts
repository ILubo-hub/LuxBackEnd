import {Column, PrimaryGeneratedColumn, Entity, OneToMany, BaseEntity} from 'typeorm';
import Product from './product';

@Entity()
export class ProductCategory extends BaseEntity {
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
    
    // This can fail
    @OneToMany(_type => Product, product => product.productCategory)
    products: Product[];
}

export default ProductCategory;
