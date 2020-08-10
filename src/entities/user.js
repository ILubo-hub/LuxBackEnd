const role = require("./role");

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
    },

    relations : {
        role: {
            target: "role",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        }
    }
};
