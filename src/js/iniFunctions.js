import { settings } from "./main.js";

// ==========================================================================
function crea_arrayTablero() {

    settings.arrayTablero = new Array(settings.constantes.FILAS);

    for (let i = 0; i < settings.arrayTablero.length; i ++) {
        // fill(0) = casilla vacia --> 1 = Jugador --> CPU
        settings.arrayTablero[i] = new Array(settings.constantes.COLUMNAS).fill(0);
    }

    console.log(settings.arrayTablero);
}

// ==========================================================================
function crea_tableroCSS() {

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
}

// ==========================================================================
function crear_letras_winnerModal(txt) {

    const letras = Array.from(settings.doms.winnerLetras);

    letras.forEach((letra, index)=> {
        letra.innerText = txt[index];
    });
}

// ==========================================================================
function comenzar_partida() {

    Object.keys(settings.estado).forEach(estado_bool => {
        settings.estado[estado_bool] = false;
    });

    if (!settings.primera_partida) {

        settings.doms.winnerModal.style.visibility = 'hidden';

        settings.arrayTablero.forEach(fila => {
            fila.fill(0);
        });

        settings.arrayFichasDom.forEach(ficha => {
            settings.doms.tablero.removeChild(ficha);
        });

        settings.arrayFichasDom = [];
    }

    console.log(settings.arrayTablero);

    settings.estado.enJuego = true;
    settings.turno = true;
    console.log(Object.values(settings.estado));
    settings.primera_partida = false;
    
    const boton = Array.from(settings.doms.botonesInicio);
    boton[0].style.visibility = 'hidden';
    
    poner_textos('Tu turno, haz click debajo...', 'var(--blanco)');
    settings.doms.textosP.style.animation = 'animaTxt 12s linear infinite';
    settings.doms.info.style.animation = 'gradientInfo 2s linear infinite';
}

// --------------------------------------------------------------------------
function poner_textos(txt, color) {
    
    settings.doms.textosP.style.color = color;
    settings.doms.textosP.innerText = txt;
}

export {
    crea_arrayTablero,
    crea_tableroCSS,
    crear_letras_winnerModal,
    comenzar_partida,
    poner_textos
};
