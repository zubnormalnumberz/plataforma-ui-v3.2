export default {
    data: function () {
        return {
            params: null,
            job_completed: false,
            bg_counter: null,
            large: false,
        }
    },
    mounted() {
        window.myModalComponent = this;
    },
    template: `<div class="modal fade" ref="my_modal" v-bind:class="sizeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header justify-content-between padding-75 small-text" v-bind:class="headerClass">
                                <span class="modal-title">{{params?.title}}</span>
                                <div>{{bg_counter}}</div>
                            </div>
                            <div class="modal-body padding-75">
                                <p v-if="!params?.job_id && job_completed" class="small-text mb-0">{{params?.message}}</p>
                                <div class="card" v-if="params?.job_id">
                                    <pre class="card-body proccess_log small-text p-2 mb-0" ref="modal_log"></pre>
                                </div>
                                <div class="alert alert-success mt-3 small-text mb-0 p-2" role="alert" v-if="params?.job_id && this.job_completed">
                                    {{params?.message}}
                                </div>
                            </div>
                            <div class="modal-footer p-2" v-if="this.job_completed">
                                <button type="button" class="btn btn-sm btn-secondary" @click="close_modal" v-if="!params?.goto_url">{{button_label}}</button>
                                <button type="button" class="btn btn-sm btn-success" @click="goto_url" v-if="this.params?.goto_url">{{button_label}}<i class="bi bi-chevron-double-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>`,
    computed: {
        sizeModal: function () {
            var css_class_list = []
            if (this.large) {
                css_class_list.push('modal-xl')
            }
            return css_class_list;
        },
        button_label() {
            if (this.params?.success) {
                if (this.params.goto_url) {
                    return 'Continuar'
                }
                return 'Fin'
            } else {
                return 'Descartar'
            }
        },
        headerClass: function () {
            if (this.job_completed) {
                if (this.params?.success) {
                    return 'modal-header-success'
                }
                return 'modal-header-danger'
            }
        }
    },
    methods: {
        close_modal() {
            let autodelete = this.params?.autodelete;

            const myModal = bootstrap.Modal.getInstance(this.$refs.my_modal);
            if (myModal) {
                myModal.hide();
            }

            if (autodelete) {
                window.closeTab();
            }
        },
        goto_url() {
            let url = this.params?.goto_url
            let title = this.params?.title

            let browserNewTab = this.params?.browserNewTab
            let autodelete = this.params?.autodelete
            let sameTab = this.params?.sameTab

            this.modal_show(null)

            if (browserNewTab) {
                window.open(url, '_blank').focus();
                this.close_modal();
            } else if (sameTab) {
                window.changeURL('', url);
            } else {
                window.addTab(title, url);
                this.close_modal();
            }

            if (autodelete) {
                window.closeTab();
            }
        },
        modal_show(params) {
            let self = this

            self.large = false
            self.job_completed = false
            let current_timeout

            if (!params) {
                self.params = null
                return
            }

            self.params = params

            this.$nextTick(() => {
                const myModal = new bootstrap.Modal(this.$refs.my_modal);
                myModal.show();
            });

            if (!params.job_id) {
                if (params.goto_url && !params.message) {
                    self.goto_url()
                    return
                }
                self.job_completed = true
                return
            }

            if (params.job_id) {
                self.large = true
                self.job_completed = false
                params.type = null

                //  TODO: Mirar si es necesario
                //  Vue.set(self.$root.modal, 'running', true)
                //  Vue.set(self.$root.modal, 'running_segs', 0)

                setTimeout(function () {
                    window
                        .FakeLogUpdater(self.$refs.modal_log) // TODO: Cambiar a LogUpdater al poner en produccion
                        .then((response) => {
                            self.running = false;
                            self.params = {
                                title: 'Completado',
                                success: response.success,
                                message: response.message,
                                job_id: params.job_id,
                                goto_url: response.goto_url || response.redirect,
                            };
                            self.job_completed = true
                            window.clearTimeout(current_timeout)
                        })
                }, 100)

                var startTime = Date.now()

                function timeToString(ms_elapsed) {
                    ms_elapsed = ms_elapsed || Date.now() - startTime
                    var segs = Math.floor(ms_elapsed / 1000)
                    var min = Math.floor(segs / 60)
                    var msg = ''
                    if (segs > 60) {
                        msg = min + 'min ' + (segs % 60) + 'segs'
                    } else {
                        msg = (segs % 60) + 'segs'
                    }
                    return msg
                }

                function update_timecounter() {
                    var ms_elapsed = Date.now() - startTime
                    var msg = timeToString(ms_elapsed)

                    self.bg_counter = msg

                    // setTimeout tarda como mínimo el tiempo indicado en delay
                    // y siempre es más que ese tiempo (~100ms). Así que ajustamos
                    // dentro de cuando es el siguiente segundo entero y esperamos
                    // los milliseconds que faltan.
                    let next_second_delay = 1000 - (ms_elapsed % 1000)

                    current_timeout = setTimeout(update_timecounter, next_second_delay)
                }

                current_timeout = setTimeout(update_timecounter, 1000)
            }
        }
    }
};