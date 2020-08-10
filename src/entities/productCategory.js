export const ProductCategory = {
    name: "ProductCategory",
    columns: {
        id: {
            primary: true,
            type: "int",
            generate: true
        },
        name: {
            type: "varchar"
        },
        description: {
            type: "text"
        },
    }
}