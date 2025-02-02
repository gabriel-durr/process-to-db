import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const KnockDownQueueJobs = async (app: FastifyInstance) => {
	const { queue } = await import('../../server')

	app.delete(
		'/knock-down-queueJobs',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				await queue.obliterate({ force: true })

				reply.status(200).send({ message: 'Fila/Jobs derrubados com Sucesso!' })
			} catch (err) {
				console.log(err)

				reply.status(500).send({ message: `Erro ao derrubar Fila/Jobs ${err}` })
			}
		}
	)
}
