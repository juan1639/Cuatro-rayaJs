import { settings } from "./main.js";
import { juega_CPU } from "./cpuFunctions.js";
import { play_sonidos } from "./functions.js";

// FUNCIONES ==============================================================
function crea_arrayTablero() {

    settings.arrayTablero = new Array(settings.constantes.FILAS);

    for (let i = 0; i < settings.arrayTablero.length; i ++)
    {
        // fill(0) = casilla vacia | 1 = Jugador | 2 = CPU
        settings.arrayTablero[i] = new Array(settings.constantes.COLUMNAS).fill(0);
    }

    console.log(settings.arrayTablero);
}

function crea_tableroCSS()
{
    const esResponsive = window.innerWidth < 768;

    if (esResponsive)
    {
        crea_tableroCSS_Responsive();
        return;
    }

    for (let i = 0; i < settings.constantes.FILAS; i ++)
    {
        for (let ii = 0; ii < settings.constantes.COLUMNAS; ii ++)
        {
            const id = i.toString() + ii.toString();
            console.log(id);

            const y = i * settings.constantes.TILE_YY;
            const x = ii * settings.constantes.TILE_XX;

            const casilla = document.createElement('div');
            casilla.setAttribute('class', 'casilla');
            casilla.setAttribute('id', id);
            casilla.style.width = settings.constantes.TILE_X;
            casilla.style.height = settings.constantes.TILE_Y;
            casilla.style.top = y.toString() + 'px';
            casilla.style.left = x.toString() + 'px';

            settings.doms.tablero.appendChild(casilla);
        }
    }
}

function crea_tableroCSS_Responsive()
{
    // To do...
    return;
}

function crear_letras_winnerModal(txt)
{
    const letras = Array.from(settings.doms.winnerLetras);

    letras.forEach((letra, index)=>
    {
        letra.innerText = txt[index];
    });
}

function comenzar_partida()
{
    Object.keys(settings.estado).forEach(estado_bool =>
    {
        settings.estado[estado_bool] = false;
    });

    if (!settings.primera_partida)
    {
        settings.doms.winnerModal.style.visibility = 'hidden';

        settings.arrayTablero.forEach(fila =>
        {
            fila.fill(0);
        });

        settings.arrayFichasDom.forEach(ficha =>
        {
            settings.doms.tablero.removeChild(ficha);
        });

        settings.arrayFichasDom = [];
    }

    console.log(settings.arrayTablero);

    settings.contadorJugadas = 0;
    settings.estado.enJuego = true;
    console.log(Object.values(settings.estado));
    settings.primera_partida = false;
    
    const boton = Array.from(settings.doms.botonesInicio);
    boton[0].style.visibility = 'hidden';

    sorteo_quienComienza(99);

    settings.doms.textosP.style.animation = 'animaTxt 12s linear infinite';
    //settings.doms.info.style.animation = 'gradientInfo 2s linear infinite';

    play_sonidos('musicafondo', true);
}

function sorteo_quienComienza(rango)
{
    const sorteo = Math.floor(Math.random() * rango);

    if (sorteo < rango / 2)
    {
        settings.turno = true;
        poner_textos('Tu turno, haz click debajo...', 'var(--blanco)');
    }
    else
    {
        settings.turno = false;
        poner_textos('Turno CPU, pensando...', 'var(--gradi-verde1)');
        juega_CPU();
    }
}

function poner_textos(txt, color)
{
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
