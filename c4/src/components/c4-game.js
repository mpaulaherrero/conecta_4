import { LitElement, html, css } from 'lit';
import './c4-board';
import './c4-messages';
import './c4-turn';
import './c4-player-selector';
import {Game} from '../models/Game';
import {refreshIcon} from '@dile/icons';
import {gameCSS} from './css/game-css';
import {Message} from '../views/Message';

export class C4Game extends LitElement {
    #game;
    #waitForUserInput;

    static styles = [
        gameCSS
    ];

    static get properties() {
        return {
            started: { type: Boolean },
        };
    }

    constructor(){
        super();
        this.#game = new Game();
        this.started = false;
        this.waitForUserInput = false;
    }

    firstUpdated(){
        Message.TITLE.write();
    }

    render() {
        return html` 
        <section>
            <header>
                <h1>${Message.GAME.toString()} <span>${Message.GAME_NUMBER.toString()}</span></h1>
                <c4-button .icon=${refreshIcon} white @click=${this.doReset}>${Message.RESET.toString()}</c4-button>
                <c4-turn
                    id="theturn"
                    .game=${this.#game}
                    @machine-player-column=${this.doUpdateBoard}
                    @wait-for-user-input=${this.doWaitForUserInput}
                ></c4-turn>
            </header>
            <main>
                <c4-player-selector
                    class="${this.started ? 'hidden': ''}"
                    @set-players=${this.doSetPlayers}
                ></c4-player-selector>
                <c4-board
                    id="theboard"
                    .game=${this.#game}
                    class="${this.started ? '': 'hidden'}"
                    @user-column-selected=${this.doUserColumnSelected}
                ></c4-board>
            </main>
        </section>
        <footer>
            <c4-messages></c4-messages>
        </footer>`;
    }

    get board() {
        return this.shadowRoot.getElementById('theboard');
    }
    
    get turn() {
        return this.shadowRoot.getElementById('theturn');
    }

    doSetPlayers(e){
        Message.NUM_PLAYERS.replace(`#playersS`, e.detail.numPlayers).write();
        this.#game.reset(e.detail.numPlayers);
        this.board.updateBoard();
        this.started=true;
        this.turn.dropToken();
    }

    doReset(){
        this.started=false;
        Message.TITLE.write();
        this.turn.resetActiveColor();
    }

    doUserColumnSelected(e){
        if(this.#waitForUserInput){
            this.#waitForUserInput=false;
            this.#game.getActivePlayer().dropToken(e.detail.column);
            this.doUpdateBoard();
        }    
    }

    doUpdateBoard(){
        this.board.updateBoard();
        if(!this.#game.isFinished()){
            this.#game.next();
            this.turn.dropToken();
        } else {
            if(this.#game.isWinner()){
                const colorS = this.#game.getActivePlayer().getColor().toString();
                Message.PLAYER_WIN.replace(`#colorS`,Message.COLORS[colorS]).write();    
            } else {
                Message.PLAYERS_TIED.write();
            }
        }
    }

    doWaitForUserInput(){
        this.#waitForUserInput=true;
    }
}
customElements.define('c4-game', C4Game);
