
export const User = {
    name:"user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        lastname: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar"
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
