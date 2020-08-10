module.exports = {
    name: "Product",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "string",
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
            type: "string",
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