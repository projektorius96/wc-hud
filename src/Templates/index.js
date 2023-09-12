import { html } from 'lit-html';
export default (function getDefaultTemplate(_marker = "", currentAt = 0){
    return (
        html`
            <template id="wchud" marker>
                <DETAILS>
                    <SUMMARY>${_marker}</SUMMARY>
                </DETAILS>
            </template>
        `.strings.raw.at(currentAt)
    )
})