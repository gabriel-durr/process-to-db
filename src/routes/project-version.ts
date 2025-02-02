import type { FastifyInstance, FastifyReply } from 'fastify'

export const ProjectVersion = (app: FastifyInstance) => {
	app.register(app =>
		app.get('/', async (_, reply: FastifyReply) => {
			try {
				reply.status(200).send({ version: 'processing data to db .:v1 🏴‍☠️' })
			} catch (err) {
				console.error(err)

				reply.status(500).send({ message: 'Internal Server Error' })
			}
		})
	)
}
