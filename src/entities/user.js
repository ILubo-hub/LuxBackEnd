module.exports = {
    name:"User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        nombre: {
            type: "string",
        },
        apellidos: {
            type: "string",
        },
        correo: {
            type: "string",
            
        },
        rol: {
            type: "string",
        },
    }
};
