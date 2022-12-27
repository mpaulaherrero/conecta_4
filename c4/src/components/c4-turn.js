import { LitElement, html, css } from 'lit';
import {Color} from '../types/Color';
import {Message} from '../views/Message';

export class C4Turn extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-top: 1.2rem;
            }
            main {
                display: flex;
                justify-content: space-between;
                padding: 0 0.6rem 0.3rem 0;
            }
            .player {
                display: flex;
                flex-direction: row;
                margin: 0.4rem 0.2rem;
                align-items: center;
                opacity: 0.2;
            }
            c4-token {
                margin-right: 1rem;
            }
            .active {
                opacity: 1;
            }
            @media(min-width: 635px) {
                main {
                    flex-direction: column;
                }
            }
        `
    ];
    
    static get properties() {
        return {
            game: { type: Object },
            activeColor: { type: Object}
        };
    }

    constructor(){
        super();
        this.activeColor=Color.NULL;
    }

    render() {
        return html`
            <main>
                <article class="player ${this.activeColor.toString()[0]== 'R' ? 'active': ''}">
                    <c4-token color="R"></c4-token>
                    <span>${Message.COLORS['Red']}</span>
                </article>
                <article class="player ${this.activeColor.toString()[0]== 'Y' ? 'active': ''}">
                    <c4-token color="Y"></c4-token>
                    <span>${Message.COLORS['Yellow']}</span>
                </article>
            </main>
        `;
    }

    resetActiveColor(){
        this.activeColor=Color.NULL;
    }

    dropToken(){
        this.activeColor = this.game.getActivePlayer().getColor();
        this.game.getActivePlayer().accept(this);
        //console.log("activeColor: ", this.activeColor.toString());
    }

    visitUserPlayer(userPlayer){
        //console.log('Tuno de', userPlayer.getColor().toString());
        Message.TURN.replace('#playerS', Message.COLORS[userPlayer.getColor().toString()]).write();
        Message.ENTER_COLUMN_TO_DROP.append();
        this.dispatchEvent(new CustomEvent('wait-for-user-input'));
    }

    visitMachinePlayer(machinePlayer){
        machinePlayer.dropToken(machinePlayer.getColumn());
        setTimeout( () => {
            this.dispatchEvent(new CustomEvent('machine-player-column', {}))
        }, 900);
    }

}
customElements.define('c4-turn', C4Turn);
