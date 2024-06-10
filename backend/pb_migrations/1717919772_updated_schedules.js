/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // remove
  collection.schema.removeField("uakuo3dn")

  // remove
  collection.schema.removeField("7bohw56t")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uakuo3dn",
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
    "id": "7bohw56t",
    "name": "selesai",
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

  // remove
  collection.schema.removeField("1qrqalqs")

  // remove
  collection.schema.removeField("0w2zk9yi")

  return dao.saveCollection(collection)
})
