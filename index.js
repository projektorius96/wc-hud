import './global.css';
import getDefaulTemplate from './src/Templates/index.js';
import { registerGetterSetter } from './src/Utils/registerGetterSetter.js';
import { 
    setInitial, 
    showGUI, 
    observedAttributesCallback as observer
} from './src/Callbacks/index.js';

globalThis.globalPubSub = new EventTarget()
class WC_HUD extends HTMLElement {

    static get observedAttributes(){
        if(window.document){
            document.body.innerHTML = getDefaulTemplate(); /* DEV_NOTE__IMPORTANT # MUST be called first as before Reflect.construct() consumes template argument */
            return [...new DOMParser().parseFromString(getDefaulTemplate(), 'text/html').all['wc-hud'].getAttributeNames().slice(1)]
        }
    }

    constructor(props) {

        super();

        const self = this;
        const { isDone, container } = setInitial(self, props);
        
        globalPubSub.addEventListener(`override:summery`, ({detail})=>{
            container.firstElementChild.textContent = detail?.marker;
        })

        if (isDone){

            registerGetterSetter(self);
            self.appendChild( showGUI(self, container) );
            
        }

    }

    attributeChangedCallback(...params) {
        observer.call(this, ...params);
    }

}

customElements.define('wc-hud', WC_HUD);
document.body.appendChild(
    Reflect.construct(customElements.get('wc-hud'), [{
        template: document.body.children['wc-hud']
        ,
        observedAttrs: {
            marker: "SUMMARY_CONTENT_PLACEHOLDER"
        }
    }])
)

///*  === DEV_NOTE # HOW TO USE GETTER/SETTER PAIR === */
/* document.getElementsByTagName('wc-hud')[0].marker */// # GETTER EXAMPLE
/* document.getElementsByTagName('wc-hud')[0].marker = Math.random() */// SETTER EXAMPLE