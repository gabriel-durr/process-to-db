import { app } from '../../server'
import { FindJobsFails } from './find-jobs-fails'
import { StartProcessing } from './start-precessing'
import { ConvertCsv2Json } from './convert-csv-2-json'
import { ProgressQueueJobs } from './progress-queue-jobs'
import { ReProcessingFails } from './re-processing-fails'
import { KnockDownQueueJobs } from './knock-down-queue-jobs'

export const ProcessingRoutes = async () => {
	app.register(FindJobsFails)
	app.register(StartProcessing)
	app.register(ConvertCsv2Json)
	app.register(ProgressQueueJobs)
	app.register(ReProcessingFails)
	app.register(KnockDownQueueJobs)
}
