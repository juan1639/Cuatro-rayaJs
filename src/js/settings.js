
export class Settings
{
    constructor()
    {
        this.constantes =
        {
            TILE_X: '120px',
            TILE_Y: '110px',
            TILE_XX: 120,
            TILE_YY: 110,
            FILAS: 6,
            COLUMNAS: 7,
            PX: 'px',
            tiempoRespuestaCPU: 3200,
            tiempoApareceWinnerModal: 2100,
            FPS: 50
        };

        this.doms =
        {
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

        this.estado =
        {
            preJuego: true,
            enJuego: false,
            gameOver: false
        };

        this.turno = true;
        this.primera_partida = true;
        this.contadorJugadas = 0;

        this.resultado =
        {
            ganaJugador: false,
            ganaCPU: false,
            empate: false
        };

        this.sonidos =
        {
            ficha1: new Audio('./src/audio/chipsCollide1.ogg'),
            ficha2: new Audio('./src/audio/chipsCollide2.ogg'),
            gameover: new Audio('./src/audio/gameover.mp3'),
            pacmandies: new Audio('./src/audio/pacmandies.ogg'),
            musicafondo: new Audio('./src/audio/music-puzzle-game1.mp3')
        };

        this.volumen =
        {
            ficha1: 0.9,
            ficha2: 0.9,
            gameover: 0.9,
            pacmandies: 0.5,
            musicafondo: 0.2
        };
    }
}
