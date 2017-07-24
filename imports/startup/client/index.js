// Import client startup through a single index entry point



// Tether.js
import tether from 'tether';
global.Tether = tether;

// Bootstrap.js
bootstrap = require('bootstrap');



// Universal components
import '/imports/ui/components/playstore-button/playstore-button.js'

// Routing
import './routes.js';

// Helpers
import './helpers.js';

