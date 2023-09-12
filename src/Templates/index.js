import { html } from 'lit-html';
export default (function getDefaultTemplate(_version = "", currentAt = 0){
    return (
        html`
            <template id="wchud" version>
                <DETAILS>
                    <SUMMARY>${_version}</SUMMARY>
                </DETAILS>
            </template>
        `.strings.raw.at(currentAt)
    )
})