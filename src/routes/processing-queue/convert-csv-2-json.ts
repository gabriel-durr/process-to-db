import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import fs from 'fs'
import path from 'path'
import csvToJson from 'convert-csv-to-json'

export const ConvertCsv2Json = async (app: FastifyInstance) => {
	app.post(
		'/convert-csv-to-json',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				const csvFilePath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'processing-data.csv'
				)
				const csvFileOutPath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'processing-data.json'
				)

				if (!fs.existsSync(csvFilePath)) {
					return reply
						.status(404)
						.send({ message: 'Arquivo CSV não encontrado' })
				}

				// Retornarar JSON do arquivo CSV Convertido
				const jsonOutput = csvToJson
					.fieldDelimiter(',')
					.getJsonFromCsv(csvFilePath)

				// Salvar a conversão CSV em uma arquivo JSON local
				// const jsonOutput = csvToJson
				// .fieldDelimiter(',')
				// .generateJsonFileFromCsv(csvFilePath, csvFileOutPath)

				reply.status(200).send({
					path: csvFilePath,
					jsonOutput
				})
			} catch (err) {
				console.error(err)

				reply.status(500).send({ message: 'Erro na conversão do arquivo' })
			}
		}
	)
}
