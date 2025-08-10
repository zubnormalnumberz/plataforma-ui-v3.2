export default {
    data: function () {
        return {
            loading_indicator: false,
            active: false,
            job_completed: false,
            bg_counter: null,
            large: false,
        }
    },
    template: `<div class="modal fade" v-bind:class="sizeModal" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header modal-header-success justify-content-between padding-75 small-text">
                                <span class="modal-title">Título</span>
                                <div>Cronómetro</div>
                            </div>
                            <div class="modal-body padding-75">
                                <p class="small-text">Ejecutada la acción 1</p>
                                <div class="card">
                                    <div class="card-body proccess_log small-text">
                                        This is the log
                                    </div>
                                </div>
                                <div class="alert alert-success mt-3 small-text mb-0" role="alert">
                                    Proceso ejecutado correctamente
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Descartar</button>
                                <button type="button" class="btn btn-sm btn-success">
                                    Continuar
                                    <i class="bi bi-chevron-double-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`,
    computed: {
        sizeModal: function () {
            //  Depender del tipo de proceso
            return "modal-xl"
        },
    },
    methods: {
        //  Estas funciones son para ejemplos. Al poner en producción eliminar
    }
};