import './global.css';
import getDefaulTemplate from './src/Templates/index.js';
import { registerGetterSetter } from './src/Utils/registerGetterSetter.js';
import { setInitial, observedAttributesCallback as observer } from './src/Callbacks/index.js';

globalThis.globalPubSub = new EventTarget()
class WC_HUD extends HTMLElement {

    static get observedAttributes(){
        if(window.document){
            document.body.innerHTML = getDefaulTemplate(); /* DEV_NOTE__IMPORTANT # MUST be called first as before Reflect.construct() consumes template argument */
            return [...new DOMParser().parseFromString(getDefaulTemplate(), 'text/html').all.wchud.getAttributeNames().slice(1)]
        }
    }

    constructor(props) {

        super();

        const { isDone, container } = setInitial(this, props);
        
        this.appendChild(container)
            container.addEventListener("click", (e)=>{
                const theContainer = e.currentTarget;
                let isOpened = theContainer.getAttributeNames().indexOf("open");
                if (isOpened > - 1) {
                    /* console.log("CLOSED"); */// [PASSED]
                    document.styleSheets[0].insertRule(":root { --content: \"➕\"; }", document.styleSheets[0].cssRules.length)
                    container.firstElementChild.textContent = "";
                }
                else {
                    /* console.log("OPENED"); */// [PASSED]
                    document.styleSheets[0].insertRule(":root { --content: \"➖\"; }", document.styleSheets[0].cssRules.length)
                    container.firstElementChild.textContent = this.attributes?.marker.value; // <= in the future container.firstElementChild will append some inner content to itself
                }
            })

        globalPubSub.addEventListener(`override:summery`, ({detail})=>{
            container.firstElementChild.textContent = detail?.marker;
        })

        if (isDone){

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
            marker: "SUMMARY_CONTENT_PLACEHOLDER"
        }
    }])
)

///*  === DEV_NOTE # HOW TO USE GETTER/SETTER PAIR === */
/* document.getElementsByTagName('wc-hud')[0].marker */// # GETTER EXAMPLE
/* document.getElementsByTagName('wc-hud')[0].marker = Math.random() */// SETTER EXAMPLE