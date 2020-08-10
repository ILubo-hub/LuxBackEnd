module.exports = {
    name:"role",
    columns: {
        id: {
            primary: true,
            type: "int",
            generate: true,
        },
        description: {
            type: "string"
        }
    }
}