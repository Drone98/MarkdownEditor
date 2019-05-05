<template>
    <li v-on:click="onChooseDocument">
        {{ name }}
        <span class="cross" v-on:click="onDeleteDocument">
            &#10005;
        </span>
    </li>
</template>

<script>
    export default {
        name: 'DocumentItem',
        props: {
            name: String,
            onChooseDocument: Function,
            onDeleteDocument: Function,
        }
    };
</script>

<style scoped>
    .cross {
        margin-left: 1rem;
        color: red;
        cursor: pointer;
    }

</style>
