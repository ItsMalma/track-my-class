/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iQ1v9Qz` ON `teachers` (`nip`)",
    "CREATE UNIQUE INDEX `idx_HTTWvgu` ON `teachers` (`user`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "17et2ffv",
    "name": "user",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_iQ1v9Qz` ON `teachers` (`nip`)",
    "CREATE UNIQUE INDEX `idx_HTTWvgu` ON `teachers` (`user_id`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "17et2ffv",
    "name": "user_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
