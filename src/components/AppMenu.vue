<script>

export default {
    name: 'AppMenu',
    props: {
        menuData: Array,
        isLastDanger: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <div class="menu">
        <ul :class="isLastDanger ? 'danger' : ''">
            <li v-for="item, index in menuData" @click="item.onClick">
                <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon" />
                <span class="label">{{ item.label }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables.scss' as *;
@use '../styles/partials/mixins.scss' as *;

.menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 20;
    border-radius: $big-border-radius;
    padding: 6px;
    background-color: #ffffff;
    @include customShadow;

    ul {
        list-style: none;

        li {
            color: $dark-color-one;
            padding: 8px 6px;
            cursor: pointer;
            
            .label {
                text-transform: capitalize;
            }
            
            .icon {
                margin-right: 6px;
            }
            
            &:hover {
                background-color: $light-color-two;
                border-radius: 8px;
            }
        }
    }
}

ul.danger {
    li:last-child {
        color: $danger-color-dark;
    }
}
</style>