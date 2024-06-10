/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg")

  // remove
  collection.schema.removeField("5tjfwxbz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5bjp8ftc",
    "name": "alamat",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5tjfwxbz",
    "name": "alamat",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("5bjp8ftc")

  return dao.saveCollection(collection)
})
