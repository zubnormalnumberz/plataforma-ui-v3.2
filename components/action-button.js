export default {
    props: {
        label: {
            type: String,
            required: true
        }
    },
    template: `<button type="button" class="btn btn-primary btn-sm">{{ label }}</button>`
};