/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rebg067znvd1rzr");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "rebg067znvd1rzr",
    "created": "2024-06-07 08:22:21.473Z",
    "updated": "2024-06-07 08:22:21.473Z",
    "name": "admins",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fnqrxqbr",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_K2nKVqh` ON `admins` (`user`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
