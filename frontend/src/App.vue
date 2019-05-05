<template>
    <div id="app">
        <DocumentList
                v-bind:documents="documents"
                v-bind:on-choose-document="handleChooseDocument"
                v-bind:on-delete-document="handleDeleteDocument"
        />
        <button v-on:click="handleCreateNewDocument">
            Create document
        </button>
        <Markdown
                v-if="documentDetail"
                v-bind:details="documentDetail"
                v-bind:on-save-document="saveDocument"
        />
    </div>
</template>

<script>
    import DocumentsService from '@/api/DocumentsService';
    import DocumentList from '@/components/DocumentList';
    import Markdown from '@/components/Markdown';


    export default {
        components: {DocumentList, Markdown},
        data: () => ({
            documents: [],
            documentDetail: null,
        }),
        created: async function () {
            await this.getDocumentsList();
            await this.getInitDocument();
        },
        methods: {
            async getDocumentsList() {
                this.documents = await DocumentsService.fetchDocumentsList();
            },
            async handleChooseDocument(id) {
                this.documentDetail = await DocumentsService.fetchDocument(id);
            },
            async getInitDocument() {
                if (this.documents.length) {
                    await this.handleChooseDocument(this.documents[0].id);
                } else {
                    this.documentDetail = null;
                }
            },
            async handleDeleteDocument(id) {
                const result = await DocumentsService.deleteDocument(id);
                if (result) {
                    await this.getDocumentsList();
                }
                if (id === this.documentDetail.id) {
                    await this.getInitDocument();
                }
            },
            async saveDocument(data) {
                return await DocumentsService.saveDocument(data);
            },
            async handleCreateNewDocument() {
                const createdDocument = await this.saveDocument({
                    text: '# New document!',
                    name: 'Untitled Document.md',
                });
                await this.handleChooseDocument(createdDocument.id);
                await this.getDocumentsList();
            },
        },
    };
</script>

<style>
    html, body, #app {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
