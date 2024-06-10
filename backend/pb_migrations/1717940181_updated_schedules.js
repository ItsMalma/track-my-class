/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // remove
  collection.schema.removeField("1qrqalqs")

  // remove
  collection.schema.removeField("0w2zk9yi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fstn8au",
    "name": "hari",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vc92rvxf",
    "name": "mulai",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vrduo07n",
    "name": "durasi",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1qrqalqs",
    "name": "mulai",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0w2zk9yi",
    "name": "selesai",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("0fstn8au")

  // remove
  collection.schema.removeField("vc92rvxf")

  // remove
  collection.schema.removeField("vrduo07n")

  return dao.saveCollection(collection)
})
