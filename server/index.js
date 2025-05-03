import Fastify from 'fastify'
import { config } from 'dotenv';

config();

const fastify = Fastify({
    logger: true
})

const PORT = process.env.PORT || 3000

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: PORT }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})