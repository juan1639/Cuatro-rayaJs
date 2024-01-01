import { settings } from "./main.js";
import { comenzar_partida } from './iniFunctions.js';
import { inicia_tirarFicha } from "./jugadorFunctions.js";

// ----------------------------------------------------------------------
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
const touchStart = document.addEventListener('touchstart', (event) => {

    console.log(event.target.id, event.targetTouches);
    const touch = event.target.id;
    
    if (settings.estado.preJuego) {

        if (touch === 'boton-comenzar') {

            console.log('comenzar partida!');
            comenzar_partida();
        }

    } else if (settings.estado.enJuego) {

        const id1 = touch.slice(0, 4);
        const id2 = touch.slice(4, 5);
        console.log(id1, id2);

        if (id1 === 'col-') {
            inicia_tirarFicha(id2);
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchend
// 
// ----------------------------------------------------------------------
/* const touchEnd = document.addEventListener('touchend', (event) => {

    console.log(event.target.id, event.targetTouches);
    const keysTeclas = Object.keys(settings.tecla);
    const touchEnd = event.target.id;
    
    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (touchEnd === settings.tecla[idTecla][0] || touchEnd === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = false;
            }
        }
    }
}); */

// ----------------------------------------------------------------------
//  EVENTOS Click
// 
// ----------------------------------------------------------------------
const click = document.addEventListener('click', (event) => {

    console.log(event.target.id);
    console.log(event);
    const clickar = event.target.id;
    
    if (settings.estado.preJuego) {

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
    click
};
