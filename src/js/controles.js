import { settings } from "./main.js";

import {
    comenzar_partida,
    inicia_tirarFicha
} from './functions.js';

// ----------------------------------------------------------------------
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
const touchStart = document.addEventListener('touchstart', (event) => {

    /* const keysTeclas = Object.keys(settings.tecla);
    const touch = event.target.id;

    if (settings.estado.reJugar) {

        if (touch === settings.tecla.touch_canvas[0]) {
            // location.reload();
            comenzar_partida();
        }
    
    } else if (settings.estado.preJuego) {

        if (touch === settings.tecla.touch_canvas[0]) {

            comenzar_partida();
        }
    }

    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (touch === settings.tecla[idTecla][0] || touch === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = true;
            }
        }
    } */
});

// ----------------------------------------------------------------------
//  EVENTOS touchend
// 
// ----------------------------------------------------------------------
const touchEnd = document.addEventListener('touchend', (event) => {

    /* console.log(event.target.id, event.targetTouches);
    const keysTeclas = Object.keys(settings.tecla);
    const touchEnd = event.target.id;
    
    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (touchEnd === settings.tecla[idTecla][0] || touchEnd === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = false;
            }
        }
    } */
});

// ----------------------------------------------------------------------
//  EVENTOS Click
// 
// ----------------------------------------------------------------------
const click = document.addEventListener('click', (event) => {

    console.log(event.target.id);
    console.log(event);
    const clickar = event.target.id;
    
    if (settings.estado.reJugar) {

        if (clickar === 'boton-rejugar') {

            // comenzar_partida();
        }
        
    } else if (settings.estado.preJuego) {

        if (clickar === 'boton-comenzar') {

            console.log('comenzar partida!');
            comenzar_partida();
        }

    } else if (settings.estado.enJuego) {

        const id1 = clickar.slice(0, 4);
        const id2 = clickar.slice(4, 5);
        console.log(id1, id2);

        if (id1 === 'col-') {
            inicia_tirarFicha(id2);
        }
    }
});

// ----------------------------------------------------------------------------
export {
    touchStart,
    touchEnd,
    click
};
