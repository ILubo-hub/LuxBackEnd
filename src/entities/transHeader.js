export const Trans_Header = {
    name:"Trans_Header",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        date: {
            type: "date"
        },
    },
    relations: {
        datails: {
            target: "Trans_Detail",
            type: "one-to-many",
            joinTable: true,
            cascade: true,
        }
    }
}
