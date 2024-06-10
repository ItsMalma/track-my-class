/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxs6ci2w",
    "name": "keterangan",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Hadir",
        "Sakit",
        "Izin",
        "Telat",
        "Alpa"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxs6ci2w",
    "name": "keterangan",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Hadir",
        "Sakit",
        "Ijin",
        "Telat",
        "Alpa"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
