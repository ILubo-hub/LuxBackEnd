export const Role = {
    name:"role",
    columns: {
        id: {
            primary: true,
            type: "int",
            generate: true,
        },
        description: {
            type: "text"
        }
    }
}