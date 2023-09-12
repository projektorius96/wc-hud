export function observedAttributesCallback(property, oldValue, newValue) {

    switch (property) {
        case 'version':
            if (oldValue !== newValue){
                
                globalPubSub.dispatchEvent(
                    new CustomEvent("override:summery", {detail: {
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
    return (
        content.children.details
    )
}

export function processShadowTree(_this, _props){

    const { version: currentVersion } = _props?.observedAttrs;
        _this.setAttribute(_this.constructor.observedAttributes[0], currentVersion || '');

    return {
        isDone: true,
        container: registerTemplateContentIDs(_props?.template.content)
    };

}