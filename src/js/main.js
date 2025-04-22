// ================================================================
//              CONECTA-4  |  By Juan Eguia, 2024
// 
// ----------------------------------------------------------------
import { Settings } from './settings.js';

import
{
    touchStart,
    click
} from './controles.js';

import
{
    crea_tableroCSS,
    crea_arrayTablero
} from './iniFunctions.js';

let settings;

window.onload = () =>
{
    settings = new Settings();

    crea_arrayTablero();
    crea_tableroCSS();
};

export { settings };
