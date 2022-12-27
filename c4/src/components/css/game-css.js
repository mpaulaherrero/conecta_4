import {css} from 'lit';

export const gameCSS = css`
            :host {
                width: 100%;
                --primary-color: #09a5ff;
                display: flex;
                flex-direction: column;
                justify-content: stretch;
            }
            .hidden {
                display: none;
            }
            section {
                display: flex;
                flex-direction: column;
                background-color: var(--primary-color);
                align-items: stretch;
                width: 100%;
                min-height: 150px;
                flex-grow: 1;
            }
            header {
                padding: 1rem;
                background-color: #31343d;
                color: #fff;
                min-width: 200px
            }
            main {
                flex-grow:1;
            }
            h1 {
                font-size: 2rem;
            }
            h1 span {
                color: var(--primary-color);
                font-weight: bold;
            }
            footer {
                padding: 0.5rem 1rem;
                background-color: #ddd;
            }
            @media(min-width:635px){
                section {
                    flex-direction: row;
                }
            }
        `