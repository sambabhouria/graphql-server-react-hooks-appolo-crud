const db = require("../data-access-layer/db");
const { PubSub, withFilter } = require("apollo-server");

const SOMETHING_CHANGED_TOPIC = "something_changed";
const POST_ADDED = "POST_ADDED";

// https://www.npmjs.com/package/PubSub
const pubsub = new PubSub();

const userAddedSubscribe = (parent, args, context, info) => {
  console.log("in the userAddedSubscribe==>");
  //return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
};

module.exports = {
  Subscription: {
    userAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => console.log("test"),
    },
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("messageAdded"),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      ),
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
    posts(root, args, context) {
      return ""; // postController.posts();
    },
  },
  Mutation: {
    // new resolver function ==> Returning an Object in Mutation
    addUser: (root, args, context, info) => {
      const id = db.users.create({
        id: args.id,
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
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      return ""; // postController.addPost(args);
    },
    addMessage: (root, { message }) => {
      return "newMessage";
    },
  },
};
