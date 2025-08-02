export default {
    props: {
        label: {
            type: String,
            required: false
        },
        labelWidth: {
            type: Number,
            required: false,
            default: 1
        },
        inputWidth: {
            type: Number,
            required: false,
            default: 1
        }
    },
    template: `
            <div style="display:contents">
                <label class="col-form-label col-form-label-sm pe-2 text-end" v-bind:class="labelClassObject">{{label}}</label>
                <div v-bind:class="inputClassObject" class="pe-1 py-1">
                    <slot>Input</slot>
                </div>
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