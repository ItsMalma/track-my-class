/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9nla8bbk9i22xbk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebamfju6",
    "name": "kode",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 10,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9nla8bbk9i22xbk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebamfju6",
    "name": "kode",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 10,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
