var hapi = require('hapi'),
    Joi  = require('joi'),
    path = require('path'),
    app  = new hapi.Server(8080, {
        cors: {
            origin: ['*']
        }
    }),

    brainGetMove = require('./brain-get-move');

app.route({
    method: 'POST',
    path: '/get-move/{id*}',
    config: {
        handler: function(request, reply) {
            var params = request.params;
            var payload = request.payload;
            brainGetMove(params.id, payload.moves, function (err, data) {
                if (err) {

                } else {
                    reply(data);
                }
            });
        },
        payload: {
            output: 'data',
            parse: true
        },
        validate: {
            payload: Joi.object().keys({
                moves: Joi.array()
            })
        }
    }
});

app.start(function () {
    console.info('Server started at: %s', app.info.uri);
});


