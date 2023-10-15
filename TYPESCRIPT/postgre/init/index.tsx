import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

// CORS Config
// default: localhost:5500
const corsOptions: cors.CorsOptions = {
    origin: ['http://127.0.0.1:5500'], // Specify your allowed frontend origins as an array
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// IMPORTS FROM OTHER FILES

// INIT
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app: express.Application = express();

// PostgreSQL configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Set your PostgreSQL connection string here
});

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connections
pool.connect()
    .then(() => {
        console.log('PostgreSQL Connection Successful');
    })
    .catch((e) => {
        console.error('Error connecting to PostgreSQL:', e);
    });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
