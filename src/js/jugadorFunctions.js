import { settings } from "./main.js";

import {
    creaFicha_yAnimaLanzamiento,
    check_colision,
    check_4raya,
    play_sonidos
} from './functions.js';

import { juega_CPU } from "./cpuFunctions.js";

import {
    poner_textos,
    crear_letras_winnerModal,
} from './iniFunctions.js';

// ==========================================================================
function inicia_tirarFicha(columna) {

    if (!settings.turno || !settings.estado.enJuego) return;

    if (settings.arrayTablero[0][columna] !== 0) {
        console.log('columna ocupada');
        return;
    }

    // ----------------------------------------------------------------
    settings.turno = false;
    console.log('CPU Pensando...');
    poner_textos('Turno CPU, pensando...', 'var(--gradi-verde1)');

    setTimeout(() => {
        console.log('tirada CPU');
        juega_CPU();
    }, settings.constantes.tiempoRespuestaCPU);

    // ----------------------------------------------------------------
    const filaLibre = check_colision(columna);
    settings.arrayTablero[filaLibre][columna] = 1; // *** 1 = ficha Jugador ***

    settings.resultado.ganaJugador = check_4raya(1);

    if (settings.resultado.ganaJugador) {

        settings.estado.enJuego = false;
        settings.estado.gameOver = true;
        console.log('ganaJugador:', settings.resultado.ganaJugador);

        setTimeout(() => {
            crear_letras_winnerModal('GANASTE!');
            settings.doms.winnerModal.style.visibility = 'visible';
            poner_textos('Has ganado!', 'var(--blanco)');
        }, settings.constantes.tiempoApareceWinnerModal);

        setTimeout(() => {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            const boton = Array.from(settings.doms.botonesInicio);
            boton[0].style.visibility = 'visible';
            play_sonidos('gameover', false);
            
        }, settings.constantes.tiempoRespuestaCPU);
    }
    
    creaFicha_yAnimaLanzamiento('ficha', filaLibre, columna);
}

export { inicia_tirarFicha };
