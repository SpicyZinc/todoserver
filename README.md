# Todo List Server

The todo list server is a simple HTTP server than allows you to implement todo list tasks and save them for the session.

The tasks are stored in memory for as long as the server runs. When the server stops, all information is lost.

## Prerequisites

You must have [Node.js](http://nodejs.org) in order to use the server. If you don't have it installed already, please visit the [Node.js](http://nodejs.org) site for installation instructions.

## Starting the Server

```
node index.js
```

## Stopping the Server

Hit Ctrl+C (Cmd+C on Macs).

## Supported Requests

There are several endpoints for you to hit in order to interact with tasks. All endpoints work using JSON exclusively, so both request bodies (when used) and response bodies must be in JSON format.

**Warning:** To simulate real-life server interaction, there is a 10% chance that any given request will fail. Be sure you take this into account.

### GET /todo/tasks

Retrieves a JSON array of the saved tasks.

### POST /todo/tasks/create

When you post a JSON object to this URL, it creates a task object in memory. *It is up to you to decide what data to store on this object.* This server just stores and sends back whatever data you add. A new ID is created and assigned to the `id` property of the object, then the object is returned as the response body (with the `id` property added).

### POST /todo/tasks/:id/edit

The `:id` is a placeholder for a task ID, so you would need to fill it in such as `/todo/tasks/12/edit`.

When you post a JSON object to this URL, the data in that object is merged into the task with the given task ID. In this way, you can modify existing properties or add new properties to existing tasks. The only property that cannot be edited is the `id` property.
# todoserver
