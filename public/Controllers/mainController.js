const loki = require("lokijs");
const read = require("read-file-utf8");
const path = require('path');

exports.mainController = {
    getContents: async () => {
        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');

        return contents.data
    },
    saveContent: async (e, content) => {
        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');

        contents.insert(content);
        db.save(err => { if (err) return { error: true, msg: "Houve algum erro ao salvar o content!!" } });

        return { error: false, msg: "Content salvo com sucesso!!!" }
    },
    editContent: async (e, content) => {

        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');
        await contents.findAndUpdate({ $loki: content.id }, item => {
            item.name = content.name;
            item.type = content.type;
            item.description = content.description;
            item.quantity = content.quantity;
        });
        db.save(err => { if (err) return { error: true, msg: "Houve algum erro ao salvar o content!!" } });
        return { error: false }
    },
    deleteItem: async (e, content) => {

        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');
        const del = await contents.chain().find({ name: content.name, type: content.type, quantity: content.quantity, description: content.description }).remove();
        console.log(del)

        db.save(err => { if (err) return { error: true, msg: "Houve algum erro ao salvar o content!!" } });
        return { error: false, msg: "item removido com sucesso!!!" }
    },
    searchingByName: async (e, content) => {

        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');
        const itens = contents.find({ "name": { "$contains": content.name } });

        return { itens }
    },
    searchingByOption: async (e, content) => {

        const db = new loki(path.join(__dirname, '../../data/db.json'));
        const data = await read(path.join(__dirname, '../../data/db.json'));
        db.loadJSON(data);
        const contents = db.getCollection('contents');
        const itens = contents.find({ type: content.type});

        return { itens }
    }
}