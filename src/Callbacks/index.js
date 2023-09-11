export function observedAttributesCallback(property, oldValue, newValue) {
    
    switch (property) {
        case 'version':
            if (oldValue !== newValue){
                /* globalThis. */globalPubSub.dispatchEvent(
                    new CustomEvent("action:subscribe", {detail: {
                        [property]: newValue
                    }})
                )
            }
            break;
        case 'other':
            /* ... IF CLAUSE for 'other' (if any) */
            break;
        default:;
    }
    
}

function registerTemplateContentIDs(content){
    Array.from(content.children).forEach((each, i)=>{
        /* if (each.tagName === 'A') console.log(new URL(each.href)?.pathname.split(",")) */// [PASSED] DEV_NOTE # use href for standardized URL constructor to register globalPubSub requests
        each.id = each.tagName.toLowerCase();
    })
    return(
        content.children
    )
}

export function processShadowTree(_this, _props){

    const { details: container } = registerTemplateContentIDs(_props?.template.content);
        _this.appendChild(container);
    
    const { version: currentVersion } = _props?.observedAttrs;
        _this.setAttribute(_this.constructor.observedAttributes[0], currentVersion || '')

    return true;

}