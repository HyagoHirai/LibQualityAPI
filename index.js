const app = require('./src/app/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
