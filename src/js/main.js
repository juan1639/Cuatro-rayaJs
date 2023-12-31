import { Settings } from './settings.js';

import {
    touchStart,
    touchEnd,
    click
} from './controles.js';
import {
    crea_tableroCSS,
    crea_arrayTablero
} from './functions.js';

let settings;

// ==========================================================================
window.onload = () => {

    settings = new Settings();

    crea_arrayTablero();
    crea_tableroCSS();

};

export { settings };
