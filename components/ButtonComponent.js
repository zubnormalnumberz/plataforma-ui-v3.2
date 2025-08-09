export default {
    props: {
        label: { type: String, required: true },
        icon: { type: String },
        buttoncoloroption: { type: String, default: 'primary' },
        disabledexpression: { type: Boolean, default: false }, //DisabledExpression: { type: Function, default: () => false }
        HideExpression: { type: Boolean, default: false }, //HideExpression: { type: Function, required: false },
    },
    template: `<button type="button" v-bind:disabled="isDisabled" class="btn btn-sm w-auto min-col-1" v-bind:class="classObject" v-bind:style="styleObject">
                    <i v-if="icon != null" class="bi" v-bind:class="iconClass"></i>
                    {{ label }}
                </button>`,
    computed: {
        isDisabled: function () {
            return this.disabledexpression
        },
        styleObject() {
            var styleObject = {}
            if (this.HideExpression) styleObject['visibility'] = 'hidden'
            return styleObject
        },
        classObject: function () {
            return "btn-" + this.buttoncoloroption
        },

        iconClass: function () {
            return this.icon
        },
    }
};