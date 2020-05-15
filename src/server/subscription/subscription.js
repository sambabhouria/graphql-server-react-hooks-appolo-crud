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
