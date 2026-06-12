import express from "express";
import ejs from "ejs";
import fs from "fs/promises";
import path from "path";

import cookieParser from "cookie-parser";

const port = process.env.port || 3000;
const app = express();

const viewsFile = path.join(import.meta.dirname, 'data/views.txt');

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

let globalViews;
try {
    const savedViews = await fs.readFile(viewsFile, 'utf8');
    globalViews = parseInt(savedViews || 0, 10); 
} catch (error) {
    await fs.writeFile(viewsFile, '0', 'utf8');
}

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use(cookieParser());

const logger = (req, res, next) => {
    console.log(`${req.url} visited at ${new Date()}`);
    next(); 
};
app.use(logger);

app.get('/', async (req, res, next) => { 
    try {
        globalViews++;
        await fs.writeFile(viewsFile, globalViews.toString(), 'utf8');

        let localViews = parseInt(req.cookies.views || 0, 10);
        localViews++;
        res.cookie('views', localViews.toString(), {
            httpOnly: true,
            maxAge: 1000*60,
        });

        res.render('index', { gviews: globalViews, lviews: localViews, });
    } catch (error) { next(error); }
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


app.listen(port, () => { console.log(`Server started at port ${port}`)});