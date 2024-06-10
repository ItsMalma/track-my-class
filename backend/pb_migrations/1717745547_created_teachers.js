/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w36epejsq3lgpsg",
    "created": "2024-06-07 07:32:27.656Z",
    "updated": "2024-06-07 07:32:27.656Z",
    "name": "teachers",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "2oglgu6p",
        "name": "nama",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 200,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zpvbsvkt",
        "name": "nip",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 10,
          "max": 20,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_iQ1v9Qz` ON `teachers` (`nip`)",
      "CREATE UNIQUE INDEX `idx_HTTWvgu` ON `teachers` (`user_id`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w36epejsq3lgpsg");

  return dao.deleteCollection(collection);
})
