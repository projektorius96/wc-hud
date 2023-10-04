import './global.css';
import { getDefaultTemplate, getInputType } from './src/Templates/index.js';
import { registerGetterSetter } from './src/Utils/registerGetterSetter.js';
import { 
    setInitial, 
    showGUI as init, 
    observedAttributesCallback as observer
} from './src/Callbacks/index.js';

globalThis.globalPubSub = new EventTarget()
class WC_HUD extends HTMLElement {

    static get observedAttributes(){
        if(window.document){
            document.body.innerHTML += getDefaultTemplate('wc-hud', false); /* DEV_NOTE__IMPORTANT # MUST be called first right before Reflect.construct() consumes template argument */
            return [...getDefaultTemplate('wc-hud', true).all['wc-hud'].getAttributeNames().slice(1)]
        }
    }

    constructor(props) {

        super();
        const self = this;
        const { isDone, container } = setInitial(self, props);
            this.container = container;

        globalPubSub.addEventListener(`override:summery`, ({detail})=>{
            container.firstElementChild.textContent = detail?.marker;
        })

        if (isDone){

            registerGetterSetter(this);
            self.appendChild( init(this, container) );
            
        }

    }

    addSection(template = document.createElement('template'), order = 'beforeend'){
        this.container.insertAdjacentHTML(order, template)
    }

    attributeChangedCallback(...params) {
        observer.call(this, ...params);
    }

}

customElements.define('wc-hud', WC_HUD);
const HUD = Reflect.construct(customElements.get('wc-hud'), [/* constructor.props@object ==> */{
    template: getDefaultTemplate('wc-hud', true).all['wc-hud']
    ,
    observedAttrs: {
        marker: ""
    }
}/* <== constructor.props@object */])

HUD.addSection(getInputType({value: 1, step: 1, min: 1, max: Number.MAX_SAFE_INTEGER}, "range" /* in this case 2nd parameter is [OPTIONAL] */))
HUD.addSection(getInputType(null, "text"))

document.body.appendChild(
    HUD
)

///*  === DEV_NOTE # HOW TO USE GETTER/SETTER PAIR === */
/* document.getElementsByTagName('wc-hud')[0].marker */// # GETTER EXAMPLE
/* document.getElementsByTagName('wc-hud')[0].marker = Math.random() */// SETTER EXAMPLE