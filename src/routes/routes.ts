import { app } from '../server'
import { ProcessingRoutes } from './processing-queue/@processing-routes'
import { ProjectVersion } from './project-version'

export const routes = () => {
	app.register(ProjectVersion)
	app.register(ProcessingRoutes)
}
