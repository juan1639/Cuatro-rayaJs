import { settings } from "./main.js";
import { comenzar_partida } from './iniFunctions.js';
import { inicia_tirarFicha } from "./jugadorFunctions.js";

// ======================================================================
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
const touchStart = document.addEventListener('touchstart', (event) =>
{
    console.log(event.target.id, event.targetTouches);
    const touch = event.target.id;
    
    if (settings.estado.preJuego)
    {
        if (touch === 'boton-comenzar')
        {
            console.log('comenzar partida!');
            comenzar_partida();
        }
    }
    else if (settings.estado.enJuego)
    {
        realizarJugada(touch);
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
const click = document.addEventListener('click', (event) =>
{
    console.log(event.target.id);
    console.log(event);
    const clickar = event.target.id;

    if (clickar === 'main')
    {
        if (settings.sonidos.musicafondo.paused)
        {
            settings.sonidos.musicafondo.play();
        }
        else
        {
            settings.sonidos.musicafondo.pause();
        }
    }
    
    if (settings.estado.preJuego)
    {
        if (clickar === 'boton-comenzar')
        {
            console.log('comenzar partida!');
            comenzar_partida();
        }

    }
    else if (settings.estado.enJuego)
    {
        realizarJugada(clickar);
    }
});

function realizarJugada(evTargetId)
{
    const fila = evTargetId.slice(0, 1);
    let columna = evTargetId.slice(1, 2);
    console.log(fila + ":" + columna);

    columna = parseInt(columna);
    console.log(typeof columna)

    inicia_tirarFicha(columna);
}

export {
    touchStart,
    click
};
