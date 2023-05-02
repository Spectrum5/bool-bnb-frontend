<script>

// Utilities
import axios from 'axios';
import { store } from '../../store';
import { router } from '../../router';

// Components
import AppLogo from '../../components/AppLogo.vue';
import AppButton from '../../components/AppButton.vue';
import AppSidebar from '../../components/AppSidebar.vue';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppLogo,
        AppButton,
        AppSidebar
    },
    data() {
        return {
            store,
            router
        }
    },
    props: {
        title: String,
        button: {
            type: Object,
            default: null
        }
    },
    methods: {
        handleLogout() {
            axios.post('http://localhost:8000/logout');
            this.store.user = null;
            console.log('Logged Out');
            router.push('/');
        }
    },
    mounted() {
        this.$nextTick(this.store.clear());
    }
}
</script>

<template>
    <div class="wrapper">

        <AppSidebar />

        <div class="rightSide">

            <header>
                <!-- Searchbar -->
                <!-- Menu Utente -->
                <button @click="handleLogout()">logout</button>
            </header>

            <div class="content">
                <header>
                    <h2 class="mainTitle">{{ this.title }}</h2>
                    <AppButton v-if="button" :to="button.link ?? null" :action="button.action ?? null" :label="button.label" :icon="button.icon ?? null" :type="'solid'" :palette="'primary'"/>
                </header>

                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;

.wrapper {
    height: 100vh;
    width: 100vw;
    @include flexRowCenter;
    overflow: hidden;
}

.mainTitle {
    margin-bottom: 0;
}

.rightSide {
    height: 100vh;
    flex-grow: 1;
    flex-shrink: 0;

    >header {
        height: 80px;
        border-bottom: 2px solid $dark-color-one;
    }

    .content {
        height: calc(100% - 80px);

        display: flex;
        flex-direction: column;

        header {
            width: 100%;
            @include flexSpaceBtwn;
            background: lightcyan;

            box-shadow: 0 4px 4px -2px white;
            isolation: isolate;
            z-index: 1;
            padding: 0.25rem 1rem;
        }
    }
}

.btn {
    padding: 7px 10px;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.btn-show {
    background-color: #f5f5f5;
    border: 2px solid #141414;
}

.btn-create {
    background-color: #59DCC0;
    border: 2px solid #59DCC0;
    color: white;
    font-weight: 600;
}

.btn-edit {
    background-color: #f5d679;
    border: 2px solid #f5d679;
}

.btn-delete {
    background-color: #f56372;
    border: 2px solid #f56372;
}
</style>