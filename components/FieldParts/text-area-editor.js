export default {
    props: {
        value: { type: String },
        height: { type: Number, default: 1 }
    },
    template: `<textarea ref="input" class="form-control form-control-sm resize-none" v-model="localState" :style="textAreaStyle"></textarea>`,
    computed: {
        localState: {
            get() {
                return this.getValue()
            },
            set(v) {
                this.$emit('input', v)
            },
        },
        textAreaStyle() {
            return {
                height: this.height === 1 ? '100%' : this.height * 30 + 'px'
            }
        },
    },
    methods: {
        getValue() {
            if (!this.value) {
                return ''
            }
            return this.value
        }
    }
};