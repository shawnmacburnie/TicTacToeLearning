var EventEmitter = require('generate-js-events'),
    Handlebars = require('handlebars');

if (typeof $ !== 'function' && typeof jQuery !== 'function') {
    throw new Error('jQuery is required.');
}

var CustomElement = EventEmitter.generate(function CustomElement(element, options) {
    var _ = this;

    _.defineProperties({
        handlebars: Handlebars.create(),
        components: [],
        $element: $(element),
        templates: {}
    });

    for (var option in options) {
        switch (option) {
        case 'templates':
            _.parseTemplates(options[option]);
            break;
        case 'partials':
            _.parsePartials(options[option]);
            break;
        case 'helpers':
            _.parseHelpers(options[option]);
            break;
        case 'interactions':
            _.parseInteractions(options[option]);
            break;
        }
    }

    // _.handlebars.registerHelper('component', function(componentName, options) {
    //     var component = _.config.subComponents[componentName];
    //     var handlebarsData = this;

    //     if (component) {
    //         var id = componentName.toLowerCase() + '-' + Math.random().toString(36).substring(7);

    //         setTimeout(function dumbTimeout() {
    //             var obj = component.create('[data-id="' + id + '"]', handlebarsData);
    //             obj.parent = _;
    //             _.components[componentName].push(obj);
    //         }, 0);

    //         return new _.handlebars.SafeString('<div data-id="' + id + '">' + handlebarsData + '</div>');
    //     } else {
    //         throw new Error('No component found (' + componentName + ').');
    //     }
    // });
});

CustomElement.createElement = function createElement(config) {
    return this.generate(function Element(el, data) {
        this.supercreate(el, config, data);
    });
};

CustomElement.definePrototype({
    __eventListener: function eventListener(interaction) {
        var _ = this;

        return function (event) {
            return interaction.listener.call(_, event, $(this));
        };
    },
    parseInteractions: function parseInteractions(interactions) {
        var _ = this;

        for (var key in interactions) {
            var interaction = interactions[key];

            if (interaction.target) {
                _.$element.on(interaction.event, interaction.target, _.__eventListener(interaction));
            } else {
                _.$element.on(interaction.event, _.__eventListener(interaction));
            }
        }
    },
    parseTemplates: function parseTemplates(templates) {
        var _ = this;

        for (var key in templates) {
            _.templates[key] = _.handlebars.compile(templates[key]);
        }
    },
    parsePartials: function parsePartials(partials) {
        var _ = this;

        for (var key in partials) {
            _.handlebars.registerPartial(key, partials[key]);
        }
    },
    parseHelpers: function parseHelpers(helpers) {
        var _ = this;

        for (var key in helpers) {
            _.handlebars.registerHelper(key, helpers[key]);
        }
    },
    update: function(newData) {
        var _ = this;

        for (var key in newData) {
            _.data[key] = newData[key];
        }

        _.render();
    },
    dispose: function dispose() {
        var _ = this;
        _.$element.off();
        _.$element.empty();
    },
    render: function render(template) {
        var _ = this,

        template = typeof template === 'string' ? _.templates[template] : _.templates.index;

        if (typeof template === 'function') {
            _.$element.html( template(_) );
        } else {
            _.emit('error', new Error('Failed to render: Invalid template.'));
        }
    }
});

window.CustomElement = module.exports = CustomElement;
