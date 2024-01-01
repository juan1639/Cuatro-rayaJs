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
            tiempoRespuestaCPU: 4500,
            FPS: 50
        };

        this.doms = {
            main: document.getElementById('main'),
            textos: document.getElementById('textos'),
            textosP: document.getElementById('textosP'),
            info: document.getElementById('info'),
            tablero: document.getElementById('tablero'),
            botonesInicio: document.getElementsByClassName('botones-inicio'),
            winnerModal: document.getElementById('winner'),
            winnerLetras: document.getElementsByClassName('letraWM')
        };

        this.arrayTablero = [];
        this.arrayFichasDom = [];

        this.estado = {
            preJuego: true,
            enJuego: false,
            gameOver: false
        };

        this.turno = true;
        this.primera_partida = true;

        this.resultado = {
            ganaJugador: false,
            ganaCPU: false,
            empate: false
        }
    }
}
