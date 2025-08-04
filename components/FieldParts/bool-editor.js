export default {
    props: {
        value: { type: Boolean }
    },
    template: `<input class="form-check-input" type="checkbox" v-model="localState">`,
    data() {
        return {
            str_value: this.value
        }
    },
    computed: {
        localState: {
            get() {
                var strVal = this.value;
                return strVal;
            },
            set(strVal) {
                this.$emit("input", strVal);
            }
        }
    }
};