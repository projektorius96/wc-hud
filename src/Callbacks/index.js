export function observedAttributesCallback(property, oldValue, newValue) {

    switch (property) {
        case 'marker':
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

export function setInitial(_this, _props){

    const { marker: currentMarker } = _props?.observedAttrs;
        _this.setAttribute(_this.constructor.observedAttributes[0], currentMarker || '');

    return {
        isDone: true,
        container: registerTemplateContentIDs(_props?.template.content)
    };

}

export function showGUI(_thisArg, _container) {
    _container.addEventListener("click", (e)=>{
        const theContainer = e.currentTarget;
        let isOpened = theContainer.getAttributeNames().indexOf("open");
        if (isOpened > - 1) {
            /* console.log("CLOSED"); */// [PASSED]
            document.styleSheets[0].insertRule(":root { --content: \"➕\"; }", document.styleSheets[0].cssRules.length)
            _container.firstElementChild.textContent = "";
        }
        else {
            /* console.log("OPENED"); */// [PASSED]
            document.styleSheets[0].insertRule(":root { --content: \"➖\"; }", document.styleSheets[0].cssRules.length)
            _container.firstElementChild.textContent = _thisArg.attributes?.marker.value; // <= in the future container.firstElementChild will append some inner content to itself
        }
    })
    return _container;
}