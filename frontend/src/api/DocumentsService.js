import api from '@/api/api'
export default {
    async fetchDocumentsList () {
        return (await api.get('documents')).data;
    },
    async fetchDocument (id) {
        return (await api.get(`document/${id}`)).data;
    },
    async saveDocument (data) {
        return (await api.post('document', data)).data;
    },
    async deleteDocument (id) {
        return (await api.delete(`document/${id}`)).data;
    }
}
