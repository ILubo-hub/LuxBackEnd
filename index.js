const Express = require('express');


const app = Express();
app.use(Express.json({extended: true}));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
