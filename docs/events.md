# Events

The [`formalist-compose`](http://github.com/icelab/formalist-compose) library exposes an event bus that communicates various event states within the compiled form. We pass this through as part of the initialisation of `formalist-standard-react` and so you can listen and respond to the following events to adjust the state of your consuming application:

* `change` - fired when the form’s state is updated, passes the internal store’s `getState` method
* `busy` - fired when the form is busy (uploading a file for example)
* `idle` - fired when the form is no longer busy
* `invalid` - fired when a validation error has occurred
* `valid` - fired when validation errors have been cleared