import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'

export const FindJobsFails = async (app: FastifyInstance) => {
	const { queue } = await import('../../server')

	app.get(
		'/find-jobs-fails',
		async (req: FastifyRequest, reply: FastifyReply) => {
			try {
				const failedJobs = await queue.getFailed()

				const jobsFailsData = failedJobs.map(fail => fail.data)

				/*
    
                SALVAR DATA DOS JOBS QUE FALHARAM EM ARQUIVO JSON

				const filePath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'fails-jobs-data.json'
				)
				fs.writeFileSync(filePath, JSON.stringify(jobsFailsData), 'utf-8')
				
                */

				/*
            
                SALVAR DADA DOS JOBS QUE FALHARAM EM ARQUIVO EXCEL
            
				const filePath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'fails-jobs-data.json'
				)

				const saveExcelOnfilePath = path.join(
					__dirname,
					'..',
					'..',
					'data',
					'fails-jobs-data.xlsx'
				)

				const fileData = fs.readFileSync(filePath, 'utf-8')

				const worksheet = XLSX.utils.json_to_sheet(JSON.parse(fileData))
				const workbook = XLSX.utils.book_new()

				XLSX.utils.book_append_sheet(workbook, worksheet, 'fails-jobs-data')

				XLSX.writeFile(workbook, saveExcelOnfilePath)
				
                */

				return reply.status(200).send({
					qdt: jobsFailsData.length,
					jobsFailsData
				})
			} catch (error) {
				console.error(error)

				reply.status(500).send({ message: 'Erro ao buscar Jobs que falharam' })
			}
		}
	)
}
