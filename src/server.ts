import Fastify from 'fastify'
import cors from '@fastify/cors'

import Queue from 'bull'
import { createBullBoard } from '@bull-board/api'
import { FastifyAdapter } from '@bull-board/fastify'
import { BullAdapter } from '@bull-board/api/bullAdapter'

import { routes } from './routes/routes'

const SEVER_PORT = 3001

export const app = Fastify()

export const queue = new Queue('Processing Medical Relationship', {
	redis: {
		host: 'localhost',
		port: 6379,
		password: 'senha!'
	}
})

const serverAdapter = new FastifyAdapter()
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
	queues: [new BullAdapter(queue)],
	serverAdapter
})

app.register(serverAdapter.registerPlugin, { prefix: '/admin/queues' })

app.register(routes)
app.register(cors, { origin: '*' })

app.listen({ port: SEVER_PORT }, err => {
	if (err) {
		console.error(err.message)
		process.exit(1)
	}

	console.log(`Server running Port: ${SEVER_PORT}`)
})
