export default {
    props: {
        title: {
            type: String,
            required: false
        },
        border: {
            type: Boolean,
            required: false,
            default: true
        },
        collapsible: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            collapseId: 'collapse' + Math.random().toString(36).substring(2, 11),
        };
    },
    template: `
        <div class="card m-2" :class="{ 'no-border-card': !border }">
            <div class="card-header" v-if="title != null && border && collapsible" data-bs-toggle="collapse" role="button" aria-expanded="true" :aria-controls="collapseId" :data-bs-target="'#' + collapseId">
                {{title}}
            </div>
            <div class="card-header" v-if="title != null && border && !collapsible">
                {{title}}
            </div>
            <div v-if="collapsible" class="collapse show" :id="collapseId">
                <div class="card-body">
                    <div class="row">
                        <slot>Contenido por defecto</slot>
                    </div>
                </div>
            </div>
            <div v-else class="card-body">
                <div class="row">
                    <slot>Contenido por defecto</slot>
                </div>
            </div>
        </div>
    `
};