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
        }, 2100);

        setTimeout(() => {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            const boton = Array.from(settings.doms.botonesInicio);
            boton[0].style.visibility = 'visible';
        }, 3500);
    }
    
    creaFicha_yAnimaLanzamiento('ficha', filaLibre, columna);
}

// ==========================================================================
function creaFicha_yAnimaLanzamiento(id, filaLibre, columna) {

    console.log(id + 'tirada...');
    const coorX = columna * settings.constantes.TILE_XX;
    const coorY = filaLibre * settings.constantes.TILE_YY;

    const ficha = document.createElement('div');
    ficha.setAttribute('class', id);

    const velAnima = [0.5, 0.3, 0.6, 1.0, 1.3, 1.6];

    if (filaLibre > 0) ficha.style.animation = `animaFicha${filaLibre} ${velAnima[filaLibre]}s linear forwards`;

    ficha.style.top = coorY.toString() + 'vw';
    ficha.style.left = coorX.toString() + 'vw';

    settings.doms.tablero.appendChild(ficha);
    settings.arrayFichasDom.push(ficha);
    console.log(Array.from(settings.doms.tablero.childNodes));
    console.log(settings.arrayFichasDom);
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
function check_4raya(id) {

    for (let i = 0; i < settings.constantes.FILAS; i ++) {
        for (let ii = 0; ii < settings.constantes.COLUMNAS; ii ++) {

            if (check_horizontales(id, i, ii, 0)) return true;
            if (check_verticales(id, i, ii, 0)) return true;
            if (check_diagonalesDerecha(id, i, ii, 0)) return true;
            if (check_diagonalesIzquierda(id, i, ii, 0)) return true;
        }
    }

    return false;
}

// ==========================================================================
function check_horizontales(id, i, ii, contador) {

    for (let offset = 0; offset < 4; offset ++) {

        if (ii + offset < settings.constantes.COLUMNAS) {

            if (settings.arrayTablero[i][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

// ==========================================================================
function check_verticales(id, i, ii, contador) {

    for (let offset = 0; offset < 4; offset ++) {

        if (i + offset < settings.constantes.FILAS) {

            if (settings.arrayTablero[i + offset][ii] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

// ==========================================================================
function check_diagonalesDerecha(id, i, ii, contador) {

    for (let offset = 0; offset < 4; offset ++) {

        if (ii + offset < settings.constantes.COLUMNAS && i + offset < settings.constantes.FILAS) {

            if (settings.arrayTablero[i + offset][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

// ==========================================================================
function check_diagonalesIzquierda(id, i, ii, contador) {

    for (let offset = 0; offset < 4; offset ++) {

        if (ii - offset >= 0 && i + offset < settings.constantes.FILAS) {

            if (settings.arrayTablero[i + offset][ii - offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

// ==========================================================================
function juega_CPU() {

    if (settings.turno || !settings.estado.enJuego) return;

    let columna;

    // ----------------------------------------------------------------
    // 1ro CPU intenta 4raya... Si NO es posible...
    // 2do CPU se defiende (de posible 4raya del jugador chekeando)...
    // 3ro como ultimo recurso, juega Random
    // ----------------------------------------------------------------
    columna = hacer4raya_siEsPosible();

    if (!settings.resultado.ganaCPU) {
        columna = defender();

        if (columna < 0 || columna > 6) columna = jugar_aleatorio_comoUltimoRecurso();
    }

    // ----------------------------------------------------------------
    settings.turno = true;
    poner_textos('Tu turno, haz click...', 'var(--blanco)');

    const filaLibre = check_colision(columna);
    settings.arrayTablero[filaLibre][columna] = 2; // *** 2 = ficha CPU ***

    settings.resultado.ganaCPU = check_4raya(2);

    if (settings.resultado.ganaCPU) {

        settings.estado.enJuego = false;
        settings.estado.gameOver = true;
        console.log('ganaCPU:', settings.resultado.ganaCPU);

        setTimeout(() => {
            crear_letras_winnerModal('PERDISTE');
            settings.doms.winnerModal.style.visibility = 'visible';
            poner_textos('Has perdido!', 'var(--gradi-verde1)');
        }, 2100);

        setTimeout(() => {
            settings.estado.gameOver = false;
            settings.estado.preJuego = true;
            const boton = Array.from(settings.doms.botonesInicio);
            boton[0].style.visibility = 'visible';
        }, 4500);
    }

    creaFicha_yAnimaLanzamiento('fichaCPU', filaLibre, columna);
}

// ==========================================================================
function jugar_aleatorio_comoUltimoRecurso() {

    let jugada_rnd;

    do {
        jugada_rnd = Math.floor(Math.random()* 7);
        console.log(jugada_rnd);

    } while (settings.arrayTablero[0][jugada_rnd] !== 0);

    return jugada_rnd;
}

// ==========================================================================
function hacer4raya_siEsPosible() {

    for (let i = 0; i < settings.constantes.COLUMNAS; i ++) {

        if (settings.arrayTablero[0][i] === 0) {

            let filaLibre = check_colision(i);
            settings.arrayTablero[filaLibre][i] = 2; // Momentaneamente colocamos ficha (para checkear despues)
            settings.resultado.ganaCPU = check_4raya(2);
            settings.arrayTablero[filaLibre][i] = 0;

            if (settings.resultado.ganaCPU) return i;
        }
    }

    return -99; // No es posible 4Raya y devuleve columna -99
}

// ==========================================================================
function defender() {

    for (let i = 0; i < settings.constantes.COLUMNAS; i ++) {

        if (settings.arrayTablero[0][i] === 0) {

            let filaLibre = check_colision(i);
            settings.arrayTablero[filaLibre][i] = 1; // Momentaneamente colocamos ficha '1' (para checkear despues)
            let check_posibilidadJugador = check_4raya(1);
            settings.arrayTablero[filaLibre][i] = 0;

            if (check_posibilidadJugador) return i;
        }
    }

    return -99; // No es posible 4Raya y devuleve columna -99
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
    comenzar_partida,
    poner_textos,
    inicia_tirarFicha
};
