const db = require("../data-access-layer/db");
const uuidv4 = require("uuid/v4");

const userAddedSubscribe = (parent, args, context, info) => {
  console.log("in the userAddedSubscribe==>");
  //return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
};

module.exports = {
  Subscription: {
    userAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => console.log("toototo"), //pubsub.asyncIterator([POST_ADDED]),
    },
  },

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
      const id = db.users.create({
        id: uuidv4(),
        name: args.name,
        username: args.username,
        email: args.email,
      });
      return db.users.get(id);
    },
    updateUser: (root, args, context, info) => {
      db.users.update({
        id: args.id,
        name: args.name,
        username: args.username,
        email: args.email,
      });
      return db.users.get(args.id);
    },
    deleteUser: (root, args, context, info) => {
      const userToDelete = db.users.get(args.id);
      db.users.delete(args.id);
      return userToDelete;
    },
  },
};
