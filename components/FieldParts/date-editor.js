export default {
    components: { VueDatePicker },
    props: {
        modelValue: { type: Date },
    },
    template: `
            <VueDatePicker
                :format="'yyyy-MM-dd'"
                v-model="localValue"
                @update:modelValue="updateValue"
                :enable-time-picker="false"
                :day-names="['L', 'M', 'X', 'J', 'V', 'S', 'D']"
                :autoApply="true"
                :ui="{input: 'form-control form-control-sm'}">
            </VueDatePicker>
    `,
    emits: ['update:modelValue'],
    data() {
        return {
            localValue: this.modelValue
        }
    },
    watch: {
        modelValue(newVal) {
            this.localValue = newVal;
        }
    },
    methods: {
        updateValue(date) {
            this.localValue = date;
            this.$emit('update:modelValue', date);
        }
    }
};