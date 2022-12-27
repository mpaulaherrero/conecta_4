import { LitElement, html, css } from 'lit';
import '@dile/dile-button/dile-button.js';
import '@dile/dile-button-icon/dile-button-icon.js';

export class C4Button extends LitElement {
    static styles = [
        css`
            :host {
                display: block;

                --dile-button-border-radius: 1rem;
                --dile-button-border-width: 1px;
                --dile-button-background-color: transparent;
                --dile-button-border-color: #fff;
                --dile-button-hover-border-color: #fff;
                --dile-button-text-color: #fff;
                --dile-icon-color: #fff;
            }

            :host([white]){
                --dile-button-background-color: #fff;
                --dile-button-border-color: transparent;
                --dile-button-hover-border-color: transparent;
                --dile-button-text-color: #303030;
                --dile-icon-color: var(--primary-color);
            }
        `
    ];

    static get properties() {
        return {
            icon: { type: Object },
        };
    }

    render() {
        return html`
            ${this.icon 
                ? html`<dile-button-icon .icon=${this.icon}><slot></slot></dile-button-icon>`
                : html`<dile-button><slot></slot></dile-button>`
            }    
        `;
    }
}
customElements.define('c4-button', C4Button);
