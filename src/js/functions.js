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
function inicia_tirarFicha(columna) {

    if (!settings.turno) return;

    if (settings.arrayTablero[0][columna] !== 0) {
        console.log('columna ocupada');
        return;
    }

    // ----------------------------------------------------------------
    settings.turno = false;
    console.log('CPU Pensando...');

    setTimeout(() => {
        console.log('tirada CPU');
    }, settings.constantes.tiempoRespuestaCPU);

    const filaLibre = check_colision(columna);
    settings.arrayTablero[filaLibre][columna] = 1; // 1 = ficha Jugador

    console.log('ficha tirada...');
    const coorX = columna * settings.constantes.TILE_XX;
    const coorY = filaLibre * settings.constantes.TILE_YY;

    const ficha = document.createElement('div');
    ficha.setAttribute('class', 'ficha');

    const velAnima = [0.5, 0.3, 0.6, 1.0, 1.3, 1.6];

    if (filaLibre > 0) ficha.style.animation = `animaFicha${filaLibre} ${velAnima[filaLibre]}s linear forwards`;

    ficha.style.top = coorY.toString() + 'vw';
    ficha.style.left = coorX.toString() + 'vw';

    settings.doms.tablero.appendChild(ficha);
}

// ==========================================================================
function check_colision(columna) {

    const filas = settings.constantes.FILAS - 1;

    for (let i = filas; i >= 0; i --) {
        if (settings.arrayTablero[i][columna] === 0) return i;
    }

    return 9; // No deberia ser posible (error)
}

// ==========================================================================
function comenzar_partida() {
    
    settings.estado.preJuego = false;
    settings.estado.enJuego = true;
    console.log(Object.values(settings.estado));
    
    const boton = Array.from(settings.doms.botonesInicio);
    boton[0].style.visibility = 'hidden';
    
    poner_textos('Tu turno, haz click...', 'var(--blanco)');
    settings.doms.textosP.style.animation = 'animaTxt 4s linear infinite';
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
    comenzar_partida,
    poner_textos,
    inicia_tirarFicha
};