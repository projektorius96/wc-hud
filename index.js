import './global.css';
import getDefaulTemplate from './src/Templates/index.js';
import { registerGetterSetter } from './src/Utils/registerGetterSetter.js';
import { processShadowTree, observedAttributesCallback as observer } from './src/Callbacks/index.js';

globalThis.globalPubSub = new EventTarget()
class WC_HUD extends HTMLElement {

    static get observedAttributes(){
        if(window.document){
            document.body.innerHTML = getDefaulTemplate(); /* DEV_NOTE__IMPORTANT # this must be called because it has to be available before Reflect.construct() consumes template argument */
            return [...new DOMParser().parseFromString(getDefaulTemplate(), 'text/html').all.wchud.getAttributeNames().slice(1)]
        }
    }

    constructor(props) {

        super();

        globalPubSub.addEventListener(`action:subscribe`, ({detail})=>{
            console.log(detail);
            this.children.details.firstElementChild.textContent = detail.version;
        })

        if (processShadowTree(this, props)){

            registerGetterSetter(this);
            
        }

    }

    attributeChangedCallback(...params) {
        observer.call(this, ...params);
    }

}

customElements.define('wc-hud', WC_HUD);
document.body.appendChild(
    Reflect.construct(customElements.get('wc-hud'), [{
        template: document.body.children?.wchud
        ,
        observedAttrs: {
            version: '1.0.0'
        }
    }])
)

///*  === DEV_NOTE # HOW TO USE GETTER/SETTER PAIR === */
/* document.getElementsByTagName('wc-hud')[0].version */// # GETTER EXAMPLE
/* document.getElementsByTagName('wc-hud')[0].version = Math.random() */// SETTER EXAMPLE