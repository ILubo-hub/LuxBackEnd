export const Trans_Detail = {
    name:"Trans_Detail",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        subTotal: {
            type: "float",
        },
        discount: {
            type: "float",
        },
        total: {
            type: "float",
        },
    },
    relations: {
        products: {
            target: "Product",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        }
    }
};
