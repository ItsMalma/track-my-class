/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // remove
  collection.schema.removeField("sadtiseg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xjcauupr",
    "name": "mataPelajaran",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bdcrvtl09iak18k",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sadtiseg",
    "name": "mataPelajaran",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9nla8bbk9i22xbk",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("xjcauupr")

  return dao.saveCollection(collection)
})
