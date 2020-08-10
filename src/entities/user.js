module.exports = {
    name:"user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "string",
        },
        lastname: {
            type: "string",
        },
        email: {
            type: "string",
            
        },
    }
};
