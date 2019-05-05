const express = require('express');
const router = express.Router();
const Document = require('../models/document-model');

const formatDocumentName = (name) => {
    return name.trim();
};
const isExistedDocument = async (id) => {
    if (!id) return false;
    return Boolean(await Document.findById(id));
};

const createDocument = async (req, res) => {
    const document = {
        name: formatDocumentName(req.body.name || 'Untitled Document'),
        text: req.body.text,
        updatedAt: new Date(),
    };

    if (await isExistedDocument(req.params.id || req.body.id)) {
        const existedDocument = await Document.findOneAndUpdate({_id: req.body.id}, document);
        return res.send(formatDoc(await Document.findById(existedDocument.id)));
    }

    const newDocument = new Document(document);

    await newDocument.save();
    return res.send(formatDoc(newDocument));
};
router.post('/document', createDocument);
router.post('/document/:id', createDocument);
router.delete('/document/:id', async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.send(true);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/documents', async (req, res) => {
    const docs = (await Document.find({}, '_id name text')).map(formatDocItem);
    try {
        res.send(docs);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/document/:id', async (req, res) => {
    try {
        res.send(formatDoc(await Document.findById(req.params.id, '_id name text')));
    } catch (e) {
        res.sendStatus(500);
    }
});

const formatDoc = (doc) => {
    return {
        id: doc.id,
        text: doc.text,
        name: doc.name,
    }
};

const formatDocItem = (doc) => {
    return {
        id: doc.id,
        name: doc.name,
    }
};

module.exports = router;
