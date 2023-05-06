<template>
    <div>
        <input type="text" placeholder="Inserisci una città" v-model="query" @input="handleInput" />
        <ul v-if="showSuggestions">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="handleSuggestionClick(suggestion)">
                {{ suggestion.description }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import { ref } from "vue";

export default {
    name: "GoogleMapsAutocomplete",
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    emits: ["update:value"],
    setup(props, { emit }) {
        const query = ref("");
        const suggestions = ref([]);
        const showSuggestions = ref(false);

        const handleInput = async () => {
            if (!query.value) {
                suggestions.value = [];
                return;
            }

            const results = await search(query.value);

            if (results) {
                suggestions.value = results;
                showSuggestions.value = true;
            }
        };

        const handleSuggestionClick = (suggestion) => {
            query.value = suggestion.description;
            showSuggestions.value = false;
            emit("update:value", suggestion.description);
        };

        const search = async (query) => {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&language=it&key=AIzaSyCzr-U6UgbrEc7wFtTyCGr1HnWdLwU-tiU`
            );

            const data = await response.json();

            if (data.status === "OK") {
                return data.predictions;
            } else {
                console.error(data.status);
                return null;
            }
        };

        return {
            query,
            suggestions,
            showSuggestions,
            handleInput,
            handleSuggestionClick,
        };
    },
};
</script>
  