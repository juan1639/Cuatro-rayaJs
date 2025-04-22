import { settings } from "./main.js";

// FUNCIONES ===============================================
function creaFicha_yAnimaLanzamiento(id, filaLibre, columna)
{
    console.log(id + 'tirada...');
    const coorX = columna * settings.constantes.TILE_XX;
    const coorY = filaLibre * settings.constantes.TILE_YY;

    const ficha = document.createElement('div');
    ficha.setAttribute('class', id);

    const velAnima = [0.5, 0.3, 0.6, 1.0, 1.3, 1.6];

    if (filaLibre > 0) ficha.style.animation = `animaFicha${filaLibre} ${velAnima[filaLibre]}s linear forwards`;

    ficha.style.top = coorY.toString() + 'px';
    ficha.style.left = coorX.toString() + 'px';

    const cuandoCae = velAnima[filaLibre] * 1000;
    play_sonidos('ficha1', false);
    play_sonidos('ficha2', false)

    setTimeout(() =>
    {
        play_sonidos('ficha2', false);
    }, cuandoCae);

    settings.doms.tablero.appendChild(ficha);
    settings.arrayFichasDom.push(ficha);
    console.log(Array.from(settings.doms.tablero.childNodes));
    console.log(settings.arrayFichasDom);
}

function check_colision(columna)
{
    const filas = settings.constantes.FILAS - 1;

    for (let i = filas; i >= 0; i --) {
        if (settings.arrayTablero[i][columna] === 0) return i;
    }

    return 9; // No deberia ser posible (error)
}

function check_4raya(id)
{
    for (let i = 0; i < settings.constantes.FILAS; i ++)
    {
        for (let ii = 0; ii < settings.constantes.COLUMNAS; ii ++)
        {

            if (check_horizontales(id, i, ii, 0)) return true;
            if (check_verticales(id, i, ii, 0)) return true;
            if (check_diagonalesDerecha(id, i, ii, 0)) return true;
            if (check_diagonalesIzquierda(id, i, ii, 0)) return true;
        }
    }

    return false;
}

function check_horizontales(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii + offset < settings.constantes.COLUMNAS)
        {

            if (settings.arrayTablero[i][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_verticales(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_diagonalesDerecha(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii + offset < settings.constantes.COLUMNAS && i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii + offset] === id) contador ++;
        }
    }

    if (contador === 4) return true;

    return false;
}

function check_diagonalesIzquierda(id, i, ii, contador)
{
    for (let offset = 0; offset < 4; offset ++)
    {
        if (ii - offset >= 0 && i + offset < settings.constantes.FILAS)
        {
            if (settings.arrayTablero[i + offset][ii - offset] === id) contador ++;
        }
    }
    
    if (contador === 4) return true;
    
    return false;
}

function play_sonidos(id, loop) {

    settings.sonidos[id].play();
    settings.sonidos[id].volume = settings.volumen[id];
    settings.sonidos[id].loop = loop;
}

export {
    creaFicha_yAnimaLanzamiento,
    check_colision,
    check_4raya,
    play_sonidos
};
