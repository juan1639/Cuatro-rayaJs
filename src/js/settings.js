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
            FPS: 50
        };

        this.doms = {
            tablero: document.getElementById('tablero'),
            botonesInicio: document.getElementsByClassName('botones-inicio')
        }
    }
}
