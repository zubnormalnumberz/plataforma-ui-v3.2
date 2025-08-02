export default {
    props: {
        value: {
            type: Number,
            required: false
        },
        decimalPlaces: {
            type: Number,
            required: false,
            default: 2
        }
    },
    template: `<input ref="input" v-model="localState" type="text" @keypress="keypress($event)" class="form-control form-control-sm text-end">`,
    computed: {
        localState: {
            get() {
                var strVal = this.convertToString(this.value);
                return strVal;
            },
            set(strVal) {
                this.$emit("input", this.convertFromString(strVal));
            }
        }
    },
    methods: {
        keypress(e) {
            e.preventDefault()
            this.enterCharacter(e.key);
        },
        enterCharacter(caracter) {
            if (caracter === ".") {
                caracter = ",";
            }
            var input = this.$refs.input;
            var str = input.value;
            var strNuevo = str.slice(0, input.selectionStart) + caracter + str.slice(input.selectionEnd);

            if (this.isValid(strNuevo)) {
                input.setRangeText(caracter, input.selectionStart, input.selectionEnd, 'end');
                var new_value = this.convertFromString(input.value);
                if (new_value !== this.value) {
                    this.$emit("input", new_value);
                }
            }
            return;
        },
        isValid(strNuevo) {
            var esNumero = /^-{0,1}\d*\,{0,1}\d*$/;
            if (esNumero.test(strNuevo)) {
                var numero_decimales = 0;
                var posicion_coma = strNuevo.search(",");
                if (posicion_coma === -1) {
                    numero_decimales = 0;
                } else {
                    var numero_decimales = strNuevo.length - posicion_coma - 1;
                }
                if (numero_decimales > this.decimalPlaces) {
                    return false;
                }

                if (posicion_coma !== -1 && this.decimalPlaces === 0) {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        },
        convertFromString(strValue) {
            if (!strValue) {
                return null;
            }
            strValue = strValue.replace(",", ".");
            var valor_num = parseFloat(strValue);
            if (isNaN(valor_num)) {
                valor_num = null;
            }
            return valor_num;
        },
        convertToString(value) {
            var valorStr = "";
            if (isNaN(value) || value == null || value == undefined) {
                valorStr = "";
            } else {
                valorStr = value.toString();
                valorStr = valorStr.replace('.', ',');
            }
            return valorStr;
        }
    }
};