var hapi = require('hapi'),
    Joi  = require('joi'),
    path = require('path'),
    app  = new hapi.Server(),

    brainGetMove = require('./brain-get-move');

app.connection({ port: 8080, labels: 'main' , routes: {cors: true}});


app.route({
    method: 'POST',
    path: '/get-move/{id*}',
    config: {
        cors: { origin : ['*'] },
        handler: function(request, reply) {
            var params = request.params;
            var payload = request.payload;
            // console.log('asking for', params.id)
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


