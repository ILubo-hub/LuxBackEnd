module.exports = {
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
    }
};
