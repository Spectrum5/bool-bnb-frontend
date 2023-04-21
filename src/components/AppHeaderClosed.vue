<script>

import { store } from '../store';
import { router } from '../router';
import AppLogo from './AppLogo.vue';

export default {
    name: 'AppHeaderClosed',
    components: {
        AppLogo,

    },
    data() {
        return {
            store,
            router
        }
    },
}
</script>

<template>
    <header>
        <div class="container-fluid">
            <nav class="navbar">
                <AppLogo />

                <!-- MENU CENTRALE-->
                <div class="searchbar first" :class="{ open: isOpen }" @click="toggleSearchbar = true">
                    <!-- Prima searchbar -->
                    <ul class="group-list" v-if="!isOpen">
                        <!-- <li class="item" v-for="(item, index) in menuItems" :key="index">
                            <a :href="item.link">{{ item.label }}</a>
                            <i class="line"></i>
                        </li> -->
                        <li class="item icon">
                            <a href="#">
                                <font-awesome-icon class="myicon" icon="fa-solid fa-magnifying-glass" />
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- MENU A DESTRA -->
                <div class="right-menu">
                    <ul class="group-list">
                        <!-- <li class="item" v-for="item in menuItems2" :key="item.label">
                            <a :href="item.link">{{ item.label }}</a>
                        </li> -->
                        <!-- <li class="item">
                            <font-awesome-icon :icon="menuItems2[1].icon" class="globe" />
                        </li> -->
                    </ul>

                    <!-- MENU DI LOGIN -->
                    <ul class="group-list ">
                        <!-- <li class="item menu-bars d-inline-block">
                            <font-awesome-icon :icon="menuHamb[0].icon" class="bars" @click="getLogin()" />
                        </li>
                        <AppLoginModal :loginModal="loginModal" />
                        <li class="item d-inline-block">
                            <font-awesome-icon :icon="menuHamb[1].icon" class="user" />
                        </li> -->
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<style lang="scss">
@import '../styles/main.scss';
@import '../styles/partials/variables.scss';

.logoContainer {
    width: 150px;
    height: 30px;

    >img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }
}
</style>