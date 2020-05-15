//https://www.npmjs.com/package/notarealdb
/***
       * // create a new item; returns a generated id
          const id = apples.create({variety: 'Gala', weight: 133}); // => 'BJ4E9mQOG'

      // list all items in a collection
          apples.list(); // => [{id: 'BJ4E9mQOG', variety: 'Gala', weight: 133}]

      // get a single item
        apples.get('BJ4E9mQOG'); // => {id: 'BJ4E9mQOG', variety: 'Gala', weight: 133}

      // update an item
      apples.update({id: 'BJ4E9mQOG', variety: 'Braeburn', weight: 133});
      // delete an item
      apples.delete('BJ4E9mQOG');
 */
const { DataStore } = require("notarealdb");
const store = new DataStore("src/server/data");
module.exports = {
  users: store.collection("users"),
};
