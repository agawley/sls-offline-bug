import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import App from '../client/app';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import path from 'path';
import serverless from 'serverless-http';

// Setup the server
export const app = express();

app.use('/public', express.static(path.normalize(path.join(__dirname, '../', 'public'))));

app.get('/*', async (req, res) => {
    const statsFile = path.normalize(path.join(__dirname, '../', 'public/loadable-stats.json'));

    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = ReactDOMServer.renderToString(
        <ChunkExtractorManager extractor={extractor}>
            <App />
        </ChunkExtractorManager>
    );
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();

    fs.readFile(path.normalize(path.join(__dirname, './', 'templates/index.html')), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Oops, better luck next time!');
        }

        const templateParts = data.split('<!--#__PLACEHOLDER__-->');

        if (templateParts.length < 4) {
            console.error(err);
            return res.status(500).send('Oops, better luck next time!');
        }

        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.status(200);
        res.write('<meta name="robots" content="noindex">\n' + '<meta name="googlebot" content="noindex">\n');
        res.write(styleTags + '\n');
        res.write(linkTags);
        res.write(templateParts[1]);
        res.write(app);
        res.write(templateParts[2]);
        res.write(scriptTags);
        res.end(templateParts[3]);
    });
});

export const handler = serverless(app);
