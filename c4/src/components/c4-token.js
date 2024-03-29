import { LitElement, html, css } from 'lit';

export class C4Token extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            span {
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #303030;
            }
            .R {
                background-color: red;
            }
            .Y {
                background-color: yellow;
            }
            @media(min-width: 350px) {
                span {
                    width: 35px;
                    height: 35px;
                }
            }
            @media(min-width: 400px) {
                span {
                    width: 40px;
                    height: 40px;
                }
            }
        `
    ];

    static get properties() {
        return {
            color: { type: String },
            index: { type: Number },
        };
    }

    render() {
        return html`
            <span
                class="${this.color}"
                @click=${this.doClick}
            ></span>
        `;
    }

    doClick(e){
        //console.log('click en la casilla: ', this.index);
        this.dispatchEvent(new CustomEvent('token-selected', {
            detail: { 
                index: this.index
            }
        }))
    }
}
customElements.define('c4-token', C4Token);
