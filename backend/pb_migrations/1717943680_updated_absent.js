/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_M83ymX7` ON `absent` (\n  `bulan`,\n  `minggu`,\n  `jadwal`,\n  `murid`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jihafnfg",
    "name": "murid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h80od77g8e4wswp",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  collection.indexes = []

  // remove
  collection.schema.removeField("jihafnfg")

  // remove
  collection.schema.removeField("nxs6ci2w")

  return dao.saveCollection(collection)
})
