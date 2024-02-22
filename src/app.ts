import express from 'express';
import cors, { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import admin from './admin';
import user from './routes/auth';

const app = express();
const PORT = 3000;
const CORS_OPTIONS: CorsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN!,
    optionsSuccessStatus: 200,
    exposedHeaders: [
        'Authorization',
    ]
}

mongoose.connect(process.env.DB_URI!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log(`Couldn't connect to the db!!`);
        console.error(err);
    })


app.use(cors(CORS_OPTIONS));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/admin', admin);
app.use('/v1/users/', user);