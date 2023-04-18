<script>

// Components
import AppLogo from '../../components/AppLogo.vue';

export default {
    name: 'AppLogin',
    components: {
        AppLogo
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>

<template>
    <header>
        <div class="container">
            <AppLogo />
        </div>
    </header>
    <main>
        <div class="container">
            <div class="formContainer">
                <h1 class="mainTitle">login</h1>
                <form>
                    <div class="row">
                        <div class="group large">
                            <label for="email">email</label>
                            <input type="text" id="email" name="email" placeholder="test@example.com">
                        </div>
                    </div>

                    <div class="row">
                        <div class="group large">
                            <label for="password">password</label>
                            <input type="password" id="password" name="password" placeholder="Your password">
                        </div>
                    </div>
                </form>
                <a href="" class="customLink">Non hai un account? Creane uno.</a>
            </div>
        </div>
    </main>

    <footer>
        <div class="container">
            FOOTER
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../../styles/partials/variables.scss' as *;
@use '../../styles/partials/mixins.scss' as *;
@use '../../styles/partials/form.scss' as *;

.mainTitle {
    margin-bottom: 1rem;
    text-transform: capitalize
}

.customLink {
    color: $color-one-dark;
    font-size: 0.9rem
}

.container {
    @include largeContainer;
    @include flexRowCenter;
}

header {
    padding: 1rem 0;
}

main {
    height: 100vh;
}

footer {
    padding: 1.5rem;
    background-color: darkgrey;
    text-align: center;
}
</style>