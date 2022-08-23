import express from 'express';
import serverless from 'serverless-http';

// Setup the server
export const app = express();

app.get('/*', async (req, res) => {
    res.send('<html><body><div>Hello Word</div></body></html>');
});

export const handler = serverless(app);
