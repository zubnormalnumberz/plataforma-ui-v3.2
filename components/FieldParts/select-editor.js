export default {
    components: {
        'v-select': window['vue-select']
    },
    data() {
        return {
            value: null,
            options: []
        };
    },
    mounted() {
        fetch('/data/municipios_bizkaia.json')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                this.options = data;
            })
            .catch(err => {
                console.error('Failed to load options JSON:', err);
            });
    },
    template: `<v-select
                    v-model="value"
                    placeholder="<vacio>"
                    label="municipio"
                    :options="options" />`
};
