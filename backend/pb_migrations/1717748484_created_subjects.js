/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bdcrvtl09iak18k",
    "created": "2024-06-07 08:21:24.098Z",
    "updated": "2024-06-07 08:21:24.098Z",
    "name": "subjects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9co8pgil",
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
      },
      {
        "system": false,
        "id": "iwpwdd4y",
        "name": "nama",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 200,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_z9MWbbS` ON `subjects` (`kode`)",
      "CREATE UNIQUE INDEX `idx_9M7sMKe` ON `subjects` (`nama`)"
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
  const collection = dao.findCollectionByNameOrId("bdcrvtl09iak18k");

  return dao.deleteCollection(collection);
})
