import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const ReProcessingFails = async (app: FastifyInstance) => {
	const { queue } = await import('../../server')

	app.post(
		'/re-processing-fails',
		async (
			req: FastifyRequest<{ Body: { repairedsData: Array<any> } }>,
			reply: FastifyReply
		) => {
			try {
				const { repairedsData } = req.body

				const failedJobs = await queue.getFailed()

				failedJobs.forEach(async job => await job.remove())

				for (const repaired of repairedsData) {
					await queue.add(repaired)
				}

				reply.status(200).send({
					message: `Falhas removidas e ${repairedsData.length} Dados foram adicionados à fila`
				})
			} catch (err) {
				console.error(err)

				reply
					.status(500)
					.send({ message: `Erro ao processar a requisição: ${err}` })
			}
		}
	)
}
