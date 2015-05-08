/**
 * @name events.js
 * @author Michaelangelo Jong
 */

// Dependences:
var Generator = require('generate-js');

// Generator
var EventEmitter = Generator.generate(
    /**
     * Create method.
     */
    function EventEmitter() {

        this.defineProperties(
            {
                configurable: false,
                enumerable: false,
                writable: false
            },
            {
                __events: Object.create(null),
                __onces: Object.create(null)
            }
        );
    }
);

// Prototype
EventEmitter.definePrototype(
    {
        configurable: false,
        enumerable: false,
        writable: false
    },
    {
        /**
         * Adds a 'listener' on 'event' to this EventEmitter instance.
         * @param  {String} event      Name of event.
         * @param  {Function} listener Event handler function.
         * @return {EventEmitter}      This EventEmitter instance.
         */
        on: function on(event, listener) {
            var _ = this,
                listeners = _.__events[event];
            if (typeof event === 'string' && listener instanceof Function) {
                if (!(listeners instanceof Array)) {
                    listeners = _.__events[event] = [];
                }
                listeners.push(listener);
            }
            return _;
        },

        /**
         * Adds a 'listener' on 'event' to this EventEmitter instance which is removed after one 'event'.
         * @param  {String} event      Name of event.
         * @param  {Function} listener Event handler function.
         * @return {EventEmitter}      This EventEmitter instance.
         */
        once: function once(event, listener) {
            var _ = this,
                listeners = _.__onces[event];
            if (typeof event === 'string' && listener instanceof Function) {
                if (!(listeners instanceof Array)) {
                    listeners = _.__onces[event] = [];
                }
                listeners.push(listener);
            }
            return _;
        },

        /**
         * Removes a 'listener' on 'event', or all listeners on 'event', or all listeners from this EventEmitter instance.
         * @param  {String} event      Name of event.
         * @param  {Function} listener Event handler function.
         * @return {EventEmitter}      This EventEmitter instance.
         */
        off: function off(event, listener) {
            var _ = this,
                listeners,
                length,
                i,
                key;
            if (typeof event === 'string' && listener instanceof Function) {
                listeners = _.__events[event];
                if (listeners instanceof Array) {
                    length = listeners.length;
                    for (i = 0; i < length; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            i--;
                        }
                    }
                }
                listeners = _.__onces[event];
                if (listeners instanceof Array) {
                    length = listeners.length;
                    for (i = 0; i < length; i++) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else if (typeof event === 'string') {
                delete _.__events[event];
                delete _.__onces[event];
            } else {
                listeners = _.__events;
                for (key in listeners) {
                    delete listeners[key];
                }
                listeners = _.__onces;
                for (key in listeners) {
                    delete listeners[key];
                }
            }
            return _;
        },

        /**
         * Emits an 'event' with 'args' on this EventEmitter instance.
         * @param  {String} event      Name of event.
         * @param  {Arguments} args    Event handler function.
         * @return {EventEmitter}      This EventEmitter instance.
         */
        emit: function emit(event) {
            var _ = this,
                args = Array.prototype.slice.call(arguments, 1),
                i,
                length,
                listener,
                listeners;
            /**
             * Creates a closure around the listener 'func' and 'args'.
             * @param  {Function} func A listener.
             * @return {Function}      Closure function.
             */
            function emitOnFunc(func) {
                return function () {
                    func.apply(null, args);
                };
            }

            listeners = _.__events[event];

            if (event === 'error' && !listeners && !(_.onerror instanceof Function)) {
                if (args[0] instanceof Error){
                    throw args[0];
                } else {
                    throw args;
                }
            }

            if (_['on' + event] instanceof Function) {
                setTimeout(emitOnFunc(_['on' + event]), 0);
            }

            if (listeners instanceof Array) {
                length = listeners.length;
                for (i = 0; i < length; i++) {
                    listener = listeners[i];
                    setTimeout(emitOnFunc(listener), 0);
                }
            }

            listeners = _.__onces[event];

            delete _.__onces[event];

            if (listeners instanceof Array) {
                length = listeners.length;
                for (i = 0; i < length; i++) {
                    listener = listeners[i];
                    setTimeout(emitOnFunc(listener), 0);
                }
            }
            return _;
        },

        /**
         * Emits an event object containing 'eventObject' on this EventEmitter instance.
         * @param  {String} event Name of event.
         * @param  {Object} eventObject  Event object sent to all on handlers.
         * @return {EventEmitter} This EventEmitter instance.
         */
        emitEvent: function emitEvent(event, eventObject) {
            var _ = this,
                timestamp = Date.now();

            eventObject = typeof eventObject === 'object' ? eventObject : { data: eventObject };

            eventObject.type = event;
            eventObject.timestamp = eventObject.timeStamp || eventObject.timestamp || timestamp;

            _.emit(event, eventObject);
            return _;
        }
    }
);

// Exports
module.exports = EventEmitter;
