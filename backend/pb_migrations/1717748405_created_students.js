/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "h80od77g8e4wswp",
    "created": "2024-06-07 08:20:05.736Z",
    "updated": "2024-06-07 08:20:05.736Z",
    "name": "students",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ph57zhyj",
        "name": "nisn",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 8,
          "max": 20,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wzqalepp",
        "name": "nama",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 194,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ghlbg0oy",
        "name": "alamat",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "ilniq4v4",
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
      },
      {
        "system": false,
        "id": "tybujhfj",
        "name": "kelas",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "qeic91rsa7e7jsq",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6wVOUa2` ON `students` (`nisn`)",
      "CREATE UNIQUE INDEX `idx_M4hpSwd` ON `students` (`nama`)"
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
  const collection = dao.findCollectionByNameOrId("h80od77g8e4wswp");

  return dao.deleteCollection(collection);
})
