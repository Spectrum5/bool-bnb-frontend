<script>

export default {
    name: 'AppFooter',
    data() {
        return {
            team: {
                title: 'il nostro team',
                members: [
                    { name: 'salvatore capano', link: 'https://github.com/SalvatoreCapano' },
                    { name: 'sergio tosku', link: 'https://github.com/Spectrum5' },
                    { name: 'giada ortesta', link: 'https://github.com/GiadaMarzapane' },
                    { name: 'lucia calenda', link: 'https://github.com/CalendaLucia' },
                    // Inserite qui i vostri link
                ]
            }
        }
    }
}
</script>

<template>
    <footer>
        <div class="container">
            <div class="col">
                <h4 class="colTitle">{{ team.title }}</h4>
                <ul>
                    <li v-for="member in team.members">
                        <a :href="member.link" target="_blank">{{ member.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@import '../styles/partials/variables.scss';

footer {
    background: $dark-color-two;
    padding: 1.5rem;
}

.col {
    .colTitle {
        color: $light-color-one;
        text-transform: uppercase;
    }

    ul {
        li{
            list-style: none;
            a {
                color: $light-color-one;
                text-transform: capitalize;
    
                &:hover {
                    color: $light-color-two;
                }
        }
        }
    }
}
</style>