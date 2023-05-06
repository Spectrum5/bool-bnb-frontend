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
  name: 'AppBadge',
  data() {
    return {
    }
  },
  props: {
    // to: String,
    // // param: undefined,
    // action: Function,
    label: String,
    icon: String,
    // type: {
    //   type: String,
    //   default: 'solid'
    // },
    palette: {
      type: String,
      default: 'primary'
    },
    // disabled: {
    //   type: Boolean,
    //   default: false
    // }
  }
}
</script>

<template>
  <div class="badge" :palette="this.palette ?? ''">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" class="icon" v-if="this.icon" />
    {{ this.label }}
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

@mixin setColor ($palette: primary, $colorA: $light-color-one, $colorB: $color-one-dark, $colorC: $color-one-light) {

  @if $palette ==primary {
    $colorB: $color-one-dark;
    $colorC: $color-two-dark;
  }
  
  @else if $palette ==secondary {
    $colorB: $secondary-color-one-light;
    $colorC: $secondary-color-two-light;
  }
  
  @else if $palette ==success {
    $colorB: $success-color-dark;
    $colorC: $success-color-light;
  }
  
  @else if $palette ==warning {
    $colorB: $warning-color-dark;
    $colorC: $warning-color-light;
  }
  
  @else if $palette ==danger {
    $colorB: $danger-color-dark;
    $colorC: $danger-color-light;
  }
  
  @else if $palette ==standard {
    $colorB: $bronze-color-dark;
    $colorC: $bronze-color-light;
  }
  
  @else if $palette ==plus {
    $colorB: $silver-color-dark;
    $colorC: $silver-color-light;
  }
  
  @else if $palette ==premium {
    $colorB: $gold-color-dark;
    $colorC: $gold-color-light;
  }
  color: $colorA;

  background: linear-gradient(45deg, $colorB, $colorC);
}


.badge {
  display: inline-block;
  border-radius: 6px;
  padding: 2px 4px;
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;

  &[palette=primary] {
    @include setColor (primary);
  }

  &[palette=secondary] {
    @include setColor (secondary);
  }

  &[palette=success] {
    @include setColor (success);
  }

  &[palette=danger] {
    @include setColor (danger);
  }

  &[palette=warning] {
    @include setColor (warning);
  }

  &[palette=standard] {
    @include setColor (standard);
  }

  &[palette=plus] {
    @include setColor (plus);
  }

  &[palette=premium] {
    @include setColor (premium);
  }

  // &:hover {
  //   outline: none;
  // }
}
</style>