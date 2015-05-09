## Table of Contents

* [ EventEmitter ](#event-emitter)
	* [ Inherits: Generator::Generation ](https://github.com/Mike96Angelo/Generate-JS#class-generation)
	* [ EventEmitter.create() ](#event-emitter-create)
	* [ EventEmitter.generate(create) ](#event-emitter-generate)
	* [ CLass: Generation ](#class-generation)
		* [ Inherits: Generator::Generation ](https://github.com/Mike96Angelo/Generate-JS#class-generation)
	* [ Class: Creation ](#class-creation)
		* [ Inherits: Generator::Creation ](https://github.com/Mike96Angelo/Generate-JS#class-creation)
		* [ Creation.on(event, listener) ](#creation-on)
		* [ Creation.once(event, listener) ](#creation-once)
		* [ Creation.off([event], [listener]) ](#creation-off)
		* [ Creation.emit(event, [...args]) ](#creation-emit)
		* [ Creation.emitEvent(event, eventObject) ](#creation-emit-event)

<a name="event-emitter"></a>
EventEmitter
============

A generator for EventEmitter, lets you create an objects that can emit events, or generate a new generator that inherits from EventEmitter.

### Install:
```
$ npm install generate-js-events
```

<a name="event-emitter-create"></a>
## EventEmitter.create()

* *return*: `Object` A new object that inherits from **EventEmitter**.

Creates a new object that inherits from **EventEmitter**.

Example:
```javascript
var EventEmitter = require('generate-js-events');

var myEmitter = EventEmitter.create();
```

<a name="event-emitter-generate"></a>
## EventEmitter.generate(create)

* *create* `Function` Create method that gets called when creating a new object that inherits from **EventEmitter**.
* *return*: `Generator` A new generator that inherits from **EventEmitter**.

Returns a new generator that inherits from **EventEmitter**.

Example:
```javascript
var myGenerator = EventEmitter.generate(
	/* create method */
	function myGenerator() {
		// my create code here
	}
);

myGenerator.definePrototype(
	{
		// my descriptor here
	},
	{
		// my prototype here
	}
);

```

<a name="class-generation"></a>
## Class: Generation

A new generator that inherits from the generator that generated it using the [ EventEmitter.generate(create) ](#event-emitter-generate) method.

<a name="class-creation"></a>
## Class: Creation

A new object that inherits from the generator that created it using the [ EventEmitter.create() ](#event-emitter-create) method.

<a name="creation-on"></a>
## Creation.on(event, listener)

* *event* `String` Name of event.
* *listener* `Function` Event handler function.
* *return*: `Object` *This* object.

Adds a 'listener' on 'event' to *this* EventEmitter instance.

Example:
```javascript
/*
 * Set lestener.
 * NOTE: myEmitter.off('error') does not remove *this* listener.
 */
myEmitter.onerror = function (err) {
	console.log(err);
}

/*
 * Add listener.
 */
myEmitter.on('myevent', function(a, b, c) {
	console.log(a, b, c);
});

```

<a name="creation-once"></a>
## Creation.once(event, listener)

* *event* `String` Name of event.
* *listener* `Function` Event handler function.
* *return*: `Object` *This* object.

Adds a 'listener' on 'event' to *this* EventEmitter instance which is removed after one 'event'.

Example:
```javascript
/*
 * Add one-time listener.
 */
myEmitter.once('myobjectevent', function(event) {
	console.log(event);
});

```

<a name="creation-off"></a>
## Creation.off([event], [listener])

* *event* `String` Name of event.
* *listener* `Function` Event handler function.
* *return*: `Object` *This* object.

Removes a 'listener' on 'event', or all listeners on 'event', or all listeners from *this* EventEmitter instance.

Example:
```javascript
/*
 * Remove specific listener.
 */
function specific(event) {
	console.log(event);
}

myEmitter.on('specific', specific);

myEmitter.off('specific', specific);

/*
 * Remove all listeners on same event.
 */
myEmitter.off('same');

/*
 * Remove All listeners.
 */
myEmitter.off();

```

<a name="creation-emit"></a>
## Creation.emit(event, [...args])

* *event* `String` Name of event.
* *args* `Arguments` All other `arguments` to be emitted to listeners.
* *return*: `Object` *This* object.

Emits an 'event' with 'args' on *this* EventEmitter instance.

Example:
```javascript
/*
 * Emits 1, 2, 3 on 'myevent' listener(s).
 */
myEmitter.emit('myevent', 1, 2, 3);

```

<a name="creation-emit-event"></a>
## Creation.emitEvent(event, eventObject)

* *event* `String` Name of event.
* *eventObject* `Object` An event object to be emitted to listeners.
* *return*: `Object` *This* object.

Emits an event object containing 'eventObject' on *this* EventEmitter instance.

Example:
```javascript
/*
 * Emits {eventData: 'data'} on 'myobjectevent' listener(s).
 */
myEmitter.emitEvent('myobjectevent', {eventData: 'data'});

```
