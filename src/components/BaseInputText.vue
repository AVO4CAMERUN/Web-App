<template>
    <div>
        <label class="sr-only">{{ name }}</label>
        <input
        :type="type"
        :class="'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 '
                + [top ? 'rounded-t-md' : bottom ? 'rounded-b-md' : '' ]  + ' focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm'"
        :placeholder="name"
        v-model="model"
        :disabled="disabled"
        />
    </div>
</template>

<script>
export default {
  name: 'BaseInputText',
  props: {
    name: String,
    modelValue: String,
    type: String,
    disabled: Boolean,
    top: Boolean,
    bottom: Boolean
  },
  computed: {
    // Computeted propertie al quale aggiungiamo un setter e getter per interagirci
    model: {
      // questo metodo verrà invocato quando si richiede il valore della Computeted prop es. :title="model" equilave a :title="model.get()"
      get () {
        return this.modelValue
      },
      // quando si fa assegnamento alla Computeted prop questo metodo verrà richiamato es. model = 'casa' equivale a model.set('casa')
      // questo metodo verrà chiamato quando v-model del input interno al componente cambierà il suo valore
      set (newValue) {
        // alza un evento che verrà intercettato dal v-model su questo componente
        // che cambierà il valore della variabile assegnata a v-model
        this.$emit('update:modelValue', newValue)
      }
    }
  }
}
</script>
