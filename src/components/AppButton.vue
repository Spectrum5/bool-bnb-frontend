<script>

// Accetta come props:
// to -> string | deve essere un path presente in router.js
// action -> function | deve essere una funzione definita nel componente padre
// label -> string | e' il testo che comparira' nel pulsante
// icon -> string | e' l'icona che comparira' nel pulsante. 
//                  deve essere disponibile su font-awesome,
//                  deve essere importata in main.js
//                  deve essere di tipo solid
//                  si scrive solo il nome effettivo dell'icona (ad esempio per 'fa-solid fa-house' e' necessario scrivere solo house)
// type -> string | solid o line
// palette -> string | primary, success, warning o danger


export default {
  name: 'AppButton',
  data() {
    return {
    }
  },
  props: {
    to: String,
    // param: undefined,
    action: Function,
    label: String,
    icon: String,
    type: {
      type: String,
      default: 'solid'
    },
    palette: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <!-- Link Button -->
  <router-link :to="this.to" v-if="this.to && !this.action" :class="this.type" :palette="this.palette ?? ''">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" class="icon" v-if="this.icon" />
    <span v-if="this.label">{{ this.label }}</span>
  </router-link>

  <!-- Action Button -->
  <button v-if="this.action && !this.to" :class="this.type" :palette="this.palette ?? ''" @click="this.action" :disabled="this.disabled">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" class="icon" v-if="this.icon" />
    <span v-if="this.label">{{ this.label }}</span>
  </button>

  <!-- Standard Button -->
  <button v-if="!this.action && !this.to" :class="this.type" :palette="this.palette ?? ''" :disabled="this.disabled">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" class="icon" v-if="this.icon" />
    <span v-if="this.label">{{ this.label }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

a,
button {
  white-space: nowrap;

  @include flexRowCenter (0.5rem);

  &[palette=primary] {
    @include customButton (primary);
  }

  &[palette=secondary] {
    @include customButton (secondary);
  }

  &[palette=success] {
    @include customButton (success);
  }

  &[palette=danger] {
    @include customButton (danger);
  }

  &[palette=warning] {
    @include customButton (warning);
  }

  &:hover {
    outline: none;
  }
}
</style>