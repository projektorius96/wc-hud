import { html } from 'lit-html';
export default (function getDefaultTemplate(marker = "", currentAt = 0){
    return (
        html`
            <template id="wchud" version>
                <DETAILS>
                    <SUMMARY>${marker}</SUMMARY>
                </DETAILS>
            </template>
        `.strings.raw.at(currentAt)
    )
})