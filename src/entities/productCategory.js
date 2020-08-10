module.exports = {
    name: "ProductCategory",
    columns: {
        id: {
            primary: true,
            type: "int",
            generate: true
        },
        name: {
            type: "string"
        },
        description: {
            type: "text"
        },
    }
}