/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_E95OSyY` ON `schedules` (\n  `guru`,\n  `kelas`,\n  `mataPelajaran`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcbyf8kwiw42g78")

  collection.indexes = []

  return dao.saveCollection(collection)
})
