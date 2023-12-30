import { Settings } from './settings.js';
import {
    touchStart,
    touchEnd,
    click
} from './controles.js';

let settings;

// ==========================================================================
window.onload = () => {

    settings = new Settings();

    const ficha = document.createElement('div');
    ficha.setAttribute('class', 'ficha');

    settings.doms.tablero.appendChild(ficha);

    for (let i = 0; i < settings.constantes.FILAS; i ++) {
        for (let ii = 0; ii < settings.constantes.COLUMNAS; ii ++) {

            const id = i.toString() + ii.toString();
            console.log(id);

            const y = i * settings.constantes.TILE_YY;
            const x = ii * settings.constantes.TILE_XX;

            const casilla = document.createElement('div');
            casilla.setAttribute('class', 'casilla');
            casilla.setAttribute('id', id);
            casilla.style.width = settings.constantes.TILE_X;
            casilla.style.height = settings.constantes.TILE_Y;
            casilla.style.top = y.toString() + 'vw';
            casilla.style.left = x.toString() + 'vw';

            settings.doms.tablero.appendChild(casilla);
        }
    }
};

export { settings };
