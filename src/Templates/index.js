/* import { html } from 'lit-html'; */// DEV_NOTE # temporarily used for highlighting instead of 3rd party extension
export function getDefaultTemplate(_id = "wc-hud", isParsed = false){

    const template = `
    <template id="${_id}" marker>
        <DETAILS>
            <SUMMARY></SUMMARY>
        </DETAILS>
    </template>
    `;

    if (!isParsed){
        return (
            template
        );
    }
    else {
        return (
            new DOMParser().parseFromString( template , 'text/html')
        )
    }
    
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

