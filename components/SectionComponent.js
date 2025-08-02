export default {
    props: {
        title: { type: String },
        border: { type: Boolean, default: true },
        collapsible: { type: Boolean, default: false },
        width: { type: Number, default: 12 },
    },
    data() {
        return {
            collapseId: 'collapse' + Math.random().toString(36).substring(2, 11),
        };
    },
    template: `
        <div v-bind:class="classObject">
            <div class="card" :class="{ 'no-border-card': !border }">
                <div class="card-header" v-if="title != null && border && collapsible" data-bs-toggle="collapse" role="button" aria-expanded="true" :aria-controls="collapseId" :data-bs-target="'#' + collapseId">
                    {{title}}
                </div>
                <div class="card-header" v-if="title != null && border && !collapsible">
                    {{title}}
                </div>
                <div v-if="collapsible" class="collapse show" :id="collapseId">
                    <div class="card-body">
                        <div class="container-card w-auto">
                            <div class="row row-cols-12">
                                <slot>Contenido por defecto</slot>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="card-body">
                    <div class="container-card w-auto">
                        <div class="row row-cols-12">
                            <slot>Contenido por defecto</slot>
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
    }
};