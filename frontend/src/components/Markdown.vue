<template>
    <div>
        <button v-on:click="handleSaveDocument">Save document</button>
        <textarea v-bind:value="input" v-on:input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
    import marked from 'marked';
    import _ from 'lodash';

    export default {
        name: 'Markdown',
        props: {
            details: Object,
            onSaveDocument: Function,
        },
        data:() => ({
            input: '# hello',
        }),
        watch: {
            details: function (newDetails) {
                this.input = newDetails.text;
            }
        },
        created: function () {
            this.input = this.details ? this.details.text : '# hello';
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, {sanitize: true});
            },
        },
        methods: {
            update: _.debounce(function (e) {
                this.input = e.target.value;
            }, 300),
            handleSaveDocument: function () {
                this.onSaveDocument({
                    ...this.details,
                    text: this.input
                })
            }
        },
    };
</script>

<style scoped>
    textarea, textarea + div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }

    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    code {
        color: #f66;
    }
    button {
        display: block;
    }
</style>
