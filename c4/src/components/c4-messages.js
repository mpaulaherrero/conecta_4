import { LitElement, html, css } from 'lit';

export class C4Messages extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            message: { type: String },
        };
    }

    constructor(){
        super();
        window.addEventListener('new-message', (e) => this.showMessage(e.detail.message));
        window.addEventListener('append-message', (e) => this.appendMessage(e.detail.message))
    }

    render() {
        return html`
            ${this.message}
        `;
    }

    showMessage(message){
        //console.log(`hola, he escuchado ${message}`);
        this.message = message;
    }

    appendMessage(message){
        //console.log(`hola, he escuchado ${message}`);
        this.message += ". " + message;
    }
}
customElements.define('c4-messages', C4Messages);
