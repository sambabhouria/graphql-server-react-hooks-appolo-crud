/**
 * 1==> Realtime GraphQL Subscriptions
 * Subscriptions are a GraphQL feature that allows a server to send data to its clients when a specific event happens.
 * Subscriptions are usually implemented with WebSockets. In that setup, the server maintains a steady connection to its subscribed client.
 * This also breaks the “Request-Response-Cycle” that were used for all previous interactions with the API.
 * Instead, the client initially opens up a long-lived connection to the server by sending a subscription query that specifies which
 * event it is interested in.
 * Every time this particular event happens, the server uses the connection to push the event data to the subscribed client(s).
 * Subscriptions usually happend  when (created, updated, deleted)
 *
 */

/**
    Subscriptions
    Learn how to achieve realtime data with GraphQL subscriptions
    In addition to fetching data using queries and modifying data using mutations, the GraphQL spec supports a third operation type, called subscription.
    GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server.
    Subscriptions are similar to queries in that they specify a set of fields to be delivered to the client, but instead of immediately returning a single answer, 
    a result is sent every time a particular event happens on the server.

    A common use case for subscriptions is notifying the client side about particular events,
    for example the creation of a new object, updated fields and so on.

    Overview
    GraphQL subscriptions have to be defined in the schema, just like queries and mutations:
    type Subscription {
            commentAdded(repoFullName: String!): Comment
    }

    On the client, subscription queries look just like any other kind of operation:

    subscription onCommentAdded($repoFullName: String!){
    commentAdded(repoFullName: $repoFullName){
        id
        content
    }

   The response sent to the client looks as follows:
    {
        data": {
        "commentAdded": {
        "id": "123",
        "content": "Hello!"
        }
    }

}

pubsub.publish('commentAdded', payload);


}



  */
