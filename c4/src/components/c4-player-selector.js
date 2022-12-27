import { LitElement, html, css } from 'lit';
import './ui/c4-button';

export class C4PlayerSelector extends LitElement {
    static styles = [
        css`
            :host {
                max-width: 460px;
                display: block;
                color: #fff;
                padding: 1rem;
            }
            h1 {
                font-weight: 300;
            }
            ul {
                margin: 0;
                padding: 0;
            }
            li {
                display: inline-block;
                padding: 0;
                margin: 0.5rem;
                list-style-type: none;
            }
            li:first-child {
                margin-left: 0;
            }
        `
    ];

    render() {
        return html`
            <h1>Seleciona el número de jugadores</h1>
            <ul><li><c4-button @click=${this.setPlayers(1)}>Un jugador</c4-button></li></ul>
            <ul><li><c4-button @click=${this.setPlayers(2)}>Dos jugadores</c4-button></li></ul>
            <ul><li><c4-button @click=${this.setPlayers(0)}>Demo</c4-button></li></ul>
        `;
    }

    setPlayers(numPlayers){
        return function (){
            this.dispatchEvent(new CustomEvent('set-players', { 
                detail: {
                    numPlayers
                }
            }));   
        }
    }
}
customElements.define('c4-player-selector', C4PlayerSelector);
