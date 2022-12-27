export class Message {
    static GAME = new Message('Conecta');
    static GAME_NUMBER = new Message('4');
    static TITLE = new Message(`--- Bienvenido al juego de CONNECTA 4 ---`);
    static NUM_PLAYERS = new Message(`Número de usuarios: #playersS`);
    static HORIZONTAL_LINE = new Message(`-`);
    static VERTICAL_LINE = new Message(`|`);
    static TURN = new Message(`Turno de #playerS`);
    static ENTER_COLUMN_TO_DROP = new Message(`Haga clic en la columna donde quiere la ficha`);
    static INVALID_COLUMN = new Message(`Invalid columnn!!! Values [1-7]`);
    static COMPLETED_COLUMN = new Message(`Invalid column!!! It's completed`);
    static PLAYER_WIN = new Message(`¡¡¡Gano el #colorS!!! :-)`);
    static PLAYERS_TIED = new Message(`¡¡¡Empate!!!`);
    static RESUME = new Message(`Do you want to continue`);
    static RESET = new Message('Empezar de nuevo');
    static NEW_VERSION = new Message('Update! there is a new version of this game...');
    static UPDATE = new Message('Update');
    static FORGET = new Message('Forget');
    static COLORS = {
        'Red': `Rojo`,
        'Yellow': `Amarillo`
    }
    #string;

    constructor(string) {
        this.#string = string;
    }

    setMessage(message) {
        this.#string = message;
        return this;
    }

    replace(key, value){
        const message = new Message(this.toString());
        message.#string = this.#string.replace(key, value);
        return message;
    }

    write() {
        this.dispatch('new-message');
    }

    append() {
        this.dispatch('append-message');
    }

    dispatch(eventName) {
        document.dispatchEvent(new CustomEvent(eventName, { 
            bubbles: true,
            composed: true,
            detail: { message: this.#string }
        }));
    }

    toString() {
        return this.#string;
    }

}