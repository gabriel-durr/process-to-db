import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import fs from 'fs'
import path from 'path'

const insertUserIntoDB = async (data: any) => {
	try {
		await new Promise(r => setTimeout(r, 1000))
	} catch (error) {
		console.error(error)
	}
}

export const StartProcessing = async (app: FastifyInstance) => {
	const { queue } = await import('../../server')

	queue.process(async job => {
		console.log(`🚀 Adicionando Item na Fila: ${JSON.stringify(job.data)}`)
		await insertUserIntoDB(job)
	})

	app.post(
		'/start-processing',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				const filePath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'processing-data.json'
				)

				if (!fs.existsSync(filePath)) {
					return reply
						.status(404)
						.send({ error: 'Arquivo JSON não encontrado' })
				}

				const fileData = fs.readFileSync(filePath, 'utf-8')
				const readJsonData = JSON.parse(fileData)

				if (!Array.isArray(readJsonData) || !readJsonData.length)
					return reply
						.status(400)
						.send({ message: 'Arquivo JSON Inválido ou Vazio' })

				for (const data of readJsonData) {
					await queue.add(data)
				}

				return reply.status(200).send({
					message: `${readJsonData.length} items foram adicionados à fila`
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
