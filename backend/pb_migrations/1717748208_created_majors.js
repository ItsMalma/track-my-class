/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9nla8bbk9i22xbk",
    "created": "2024-06-07 08:16:48.333Z",
    "updated": "2024-06-07 08:16:48.333Z",
    "name": "majors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ebamfju6",
        "name": "kode",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 10,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "avxgii43",
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
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_BgLdn74` ON `majors` (`kode`)",
      "CREATE UNIQUE INDEX `idx_E2pzo0O` ON `majors` (`nama`)"
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
  const collection = dao.findCollectionByNameOrId("9nla8bbk9i22xbk");

  return dao.deleteCollection(collection);
})
