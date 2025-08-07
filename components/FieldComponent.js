export default {
    props: {
        label: { type: String, },
        labelWidth: { type: Number, default: 1 },
        inputWidth: { type: Number, default: 1 },
        StartNewLine: { type: Boolean },
        HideExpression: { type: Boolean }, // Hau berez Expression da, moldatuko da gero. Importantiena hemen estilue
    },
    template: `
        <label class="col-form-label col-form-label-sm pe-2 text-end align-self-start" v-bind:class="labelClassObject">{{label}}</label>
        <div class="my-auto" v-bind:class="inputClassObject">
            <slot>Input</slot>
        </div>
    `,
    computed: {
        labelClassObject() {
            return ['col-sm-' + this.labelWidth]
        },
        inputClassObject() {
            return ['col-sm-' + this.inputWidth]
        }
    }
};