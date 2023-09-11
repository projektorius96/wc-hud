export function registerGetterSetter(_thisArg, _arbitraryPropName = ''){
    const _observedAttrs = _thisArg?.constructor.observedAttributes;
    return (
        [...new Array(_observedAttrs.length).fill(_thisArg)].forEach((theElement, j)=>{
            Object.defineProperty(theElement, (_arbitraryPropName || _observedAttrs[j].toString()), {
                get() {
                    return theElement.getAttribute(_observedAttrs[j].toString())
                }
                ,
                set(newValue) {
                    return theElement.setAttribute(_observedAttrs[j].toString(), newValue)
                }
            })
        })
    )
}