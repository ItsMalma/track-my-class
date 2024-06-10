/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qeic91rsa7e7jsq",
    "created": "2024-06-07 08:17:58.255Z",
    "updated": "2024-06-07 08:17:58.255Z",
    "name": "classes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hltvellt",
        "name": "tingkat",
        "type": "number",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 10,
          "max": 13,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "ykclhgwe",
        "name": "jurusan",
        "type": "relation",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "collectionId": "9nla8bbk9i22xbk",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "xo7zrodw",
        "name": "sub",
        "type": "number",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6SINS4I` ON `classes` (\n  `tingkat`,\n  `jurusan`,\n  `sub`\n)"
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
  const collection = dao.findCollectionByNameOrId("qeic91rsa7e7jsq");

  return dao.deleteCollection(collection);
})
