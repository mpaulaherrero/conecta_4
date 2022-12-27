import { LitElement, html, css } from 'lit';
import { Coordinate } from '../types/Coordinate.js';
import { Message } from '../views/Message.js';
import "./c4-token";

export class C4Board extends LitElement {
    static styles = [
        css`
            :host {
                max-width: 460px;
                margin: 1rem;
                display: grid;
                grid-template-columns: repeat(${Coordinate.NUMBER_COLUMNS}, auto);
                column-gap: 0.4rem;
                row-gap: 0.6rem;
            }
        `
    ];

    static get properties() {
        return {
            game: { type: Object },
            boardColors: { type: Array },
        };
    }

    constructor() {
        super();
        this.boardColors = [];
    }
    
    render() {
        return html`
            ${this.boardColors.map( (color, index) => html`
                <c4-token 
                    index="${index}" 
                    color="${color}"
                    @token-selected=${this.doTokenSelected}
                ></c4-token>
            `)}
        `;
    }

    updateBoard() {
        this.boardColors = [];
        for (let i = Coordinate.NUMBER_ROWS - 1; i >= 0; i--) {
            for (let j = 0; j < Coordinate.NUMBER_COLUMNS; j++) {
                this.boardColors.push(this.game.getColor(new Coordinate(i, j)).toString()[0]);
            }
        }
    }

    doTokenSelected(e){
        let column = e.detail.index % Coordinate.NUMBER_COLUMNS;
        if(this.game.getActivePlayer().isComplete(column)){
            Message.COMPLETED_COLUMN.write();
        } else {
            //console.log('columna ', column, ' con espacio');
            this.dispatchEvent(new CustomEvent('user-column-selected', {
                detail: {
                    column
                }
            }));
        }
    }

}
customElements.define('c4-board', C4Board);
