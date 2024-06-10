/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  collection.name = "absents"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_M83ymX7` ON `absents` (\n  `bulan`,\n  `minggu`,\n  `jadwal`,\n  `murid`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp")

  collection.name = "absent"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_M83ymX7` ON `absent` (\n  `bulan`,\n  `minggu`,\n  `jadwal`,\n  `murid`\n)"
  ]

  return dao.saveCollection(collection)
})
