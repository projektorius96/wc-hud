/* import { html } from 'lit-html'; */// DEV_NOTE # temporarily used for highlighting instead of 3rd party extension
export function getDefaultTemplate(_marker = "", _index = 0){

    return (
            // DEV_NOTE@NEXT_GOAL # registerGetterSetter for {value,step,min,max} instead of marker, as the marker attribute herein is not needed anymore, permission to resign is given
            /* html */`
                <template id="wc-hud" marker>
                    <DETAILS>
                        <SUMMARY>${_marker}</SUMMARY>
                    </DETAILS>
                </template>
            `

    )
    
}

export function getInputType(props = {value: 0, step: 0, min: 0, max: 0}, type = "range"){

    switch(type){
        case 'range':
            return `<input type="${type}" value=${props.value} step="${props.step}" min="${props.min}" max="${props.max}">`
        case 'text':
            return `<input type="text">`
        default:;
    }

}

