/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ip39c1e42c8qwhp",
    "created": "2024-06-09 14:31:00.452Z",
    "updated": "2024-06-09 14:31:00.452Z",
    "name": "absent",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "txhhjrmw",
        "name": "bulan",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 12,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "vxaw3ujr",
        "name": "minggu",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 5,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "hxmssnvq",
        "name": "jadwal",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "tcbyf8kwiw42g78",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("ip39c1e42c8qwhp");

  return dao.deleteCollection(collection);
})
