import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';

// Import module map for lazy loading (delay loading of an object until it is needed)
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';

// Faster server render with Prod mode (dev mode never needed)
enableProdMode();

// Express Server
const app = express();

const PORT = process.env.PORT || 3000;
// dist folder in current working directory
const DIST_FOLDER = join(process.cwd(), 'dist');

// * Note :: leave this a require() since this file is built dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./server/main');

// our universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1d'
}));

// Refer this for more age options : https://www.npmjs.com/package/ms#readme

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {req});
});

// Start up the Node Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});


