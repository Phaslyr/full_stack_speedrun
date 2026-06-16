import express from "express";
import cors from "cors";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.static("."));

let views = 0;

app.get('/views', (req, res) => {
    res.send({ totalViews: views });
});

app.post('/views/increment', (req, res) => {
    views++;
    res.send({ totalViews: views });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});