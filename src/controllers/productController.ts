import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entities/product";

export class ProductController {
    static listAll = async(res: Response) => {
        const productRepository = getRepository(Product);
        const products = await productRepository.find({
            select: ["name", "description", "quantity"]
        });
        res.send(products)
    };

    static getOnById = async(req: Request, res: Response) => {
        const productRepository = getRepository(Product);
        const id: number = parseInt(req.params.id);
        try{
            const product = await productRepository.findOneOrFail(id, {
                select: ["name", "description", "quantity"]
            });
            res.status(200).send({"msj": "Product found succesfully", "data": product});
        }catch(error){
            res.status(404).send("User not found");
        }
    };

    static newProduct = async(req: Request, res: Response) => {
        let {name, description, quantity} = req.body;

        let product = new Product();
        product.name = name;
        product.description = description;
        product.quantity = quantity;

        const errors = await validate(Product);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        const productRepository = getRepository(Product);

        try {
            await productRepository.save(product);
            res.status(201).send("Product created succesfully");
        }catch(e){
            res.status(409).send("This product is already in saved");
            return;
        }
    };

    static editProduct = async(req: Request, res: Response) => {
        let id = req.params.id;

        let {name, description} = req.body;

        const productRepository = getRepository(Product);
        let product;
        try{
            product = await productRepository.findOneOrFail(id);
        }catch(error){
            res.status(404).send("User not found");
            return;
        }
        product.name = name;
        product.description = description;
        const errors = await validate(product);
        if(errors.length > 0){
            res.status(400).send(errors);
            return
        }

        try{
            await productRepository.save(product);
            res.status(201).send("Product edited succesfully");
        }catch(e){
            res.status(409).send("Name is Already in use");
            return;
        }
    };

    static deleteProduct = async(req: Request, res: Response) => {
        let id = req.params.id;
        let productRepository = getRepository(Product);
        let product: Product;
        try{
            product = await productRepository.findOneOrFail(id);
            productRepository.delete(id);
            res.status(204).send();
        }catch(error){
            res.status(404).send("User not found");
            return;
        }
    }
}