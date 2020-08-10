export const Product = {
    name: "Product",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        description: {
            type: "text",
        },
        quantity: {
            type: "int",
        },
        price: {
            type: "float",
        },
        sellerName: {
            type: "varchar",
        },
    },
    relations: {
        category: {
            target: "ProductCategory",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        }
    }
}