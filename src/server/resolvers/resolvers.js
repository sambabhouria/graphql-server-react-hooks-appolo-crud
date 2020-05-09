const db = require("../data-access-layer/db");
const uuidv4 = require("uuid/v4");
module.exports = {
  Query: {
    users: (root, args) => {
      return db.users.list();
    },
    userById: (root, args, context, info) => {
      //args will contain parameter passed in query
      console.log(args.id);
      return db.users.get(args.id);
    },
    hello: () => "Hello world!",
  },
  Mutation: {
    // new resolver function ==> Returning an Object in Mutation
    addUser: (root, args, context, info) => {
      console.log("args", args);

      const id = db.users.create({
        id: uuidv4(),
        name: args.name,
        username: args.username,
        email: args.email,
      });

      return db.users.get(id);
    },
  },
};
