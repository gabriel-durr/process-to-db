import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const ProgressQueueJobs = async (app: FastifyInstance) => {
	const { queue } = await import('../../server')

	app.get(
		'/progress-queue-jobs',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				const jobs = await queue.getJobs(['active', 'waiting'])
				const jobProgress = jobs.map(job => ({
					jobId: job.id,
					progress: job.progress(),
					medicalRelationship: job.data
				}))

				reply.status(200).send({
					message: 'Progresso dos relacionamentos',
					progress: jobProgress
				})
			} catch (err) {
				console.error(err)

				reply
					.status(500)
					.send({ message: `Erro ao obter o progresso da Fila: ${err}` })
			}
		}
	)
}
