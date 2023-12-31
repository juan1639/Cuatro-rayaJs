// ==========================================================================
export class Settings {

    constructor() {

        this.constantes = {
            TILE_X: '8vw',
            TILE_Y: '8vw',
            TILE_XX: 8,
            TILE_YY: 8,
            FILAS: 6,
            COLUMNAS: 7,
            tiempoRespuestaCPU: 3000,
            FPS: 50
        };

        this.doms = {
            main: document.getElementById('main'),
            textos: document.getElementById('textos'),
            textosP: document.getElementById('textosP'),
            info: document.getElementById('info'),
            tablero: document.getElementById('tablero'),
            botonesInicio: document.getElementsByClassName('botones-inicio')
        };

        this.arrayTablero = [];

        this.estado = {
            preJuego: true,
            enJuego: false,
            gameOver: false,
            reJugar: false
        };

        this.turno = true;

        this.resultado = {
            ganaJugador: false,
            ganaCPU: false,
            empate: false
        }
    }
}
