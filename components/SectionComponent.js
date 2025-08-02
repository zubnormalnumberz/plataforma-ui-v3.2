export default {
    props: {
        title: { type: String },
        border: { type: Boolean, default: true },
        collapsible: { type: Boolean, default: false },
        width: { type: Number, default: 12 },
    },
    template: `
        <div :class="classObject">
            <div class="card" :class="{ 'no-border-card': !border }">
                <div v-if="title != null && border" class="card-header" :role="collapsible ? 'button' : null" @click="collapsible ? toggle() : null">
                    {{ title }}
                </div>
                <div :id="collapseId" class="collapse show">
                    <div class="card-body">
                        <div class="container-card w-auto">
                            <div class="row row-cols-12">
                                <slot>Contenido por defecto</slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    computed: {
        classObject: function () {
            return ['col-' + this.width]
        },
    },
    mounted() {
        const el = document.getElementById(this.collapseId);
        if (this.collapsible) {
            this.collapseInstance = new bootstrap.Collapse(el, {
                toggle: false
            });
        }
    },
    methods: {
        toggle() {
            if (this.collapsible && this.collapseInstance) {
                this.collapseInstance.toggle();
            }
        },
    },
    data() {
        return {
            collapseId: 'collapse-' + Math.random().toString(36).substring(2, 11),
            collapseInstance: null,
        };
    },
};