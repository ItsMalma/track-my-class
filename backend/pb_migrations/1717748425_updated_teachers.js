/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pri2wto6",
    "name": "nomorWhatsapp",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg")

  // remove
  collection.schema.removeField("5tjfwxbz")

  // remove
  collection.schema.removeField("pri2wto6")

  return dao.saveCollection(collection)
})
