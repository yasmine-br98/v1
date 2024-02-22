import express, { Request, Response } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'
import routes from './routes'
import config from './config/config'
import errorHandler from './middlewares/errorHandler'

const app = express()

/**
 * App Configuration
 */

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/**
 * Server static files
 */
app.use(express.static('public'))

app.use('/api/V1', routes)

// Middleware de gestion des erreurs global
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/api-docs', (req: Request, res: Response) => {
  res.json({
    swagger: `the API documentation  is now available on https://localhost:${config.PORT}/api-docs`,
  })

})

app.listen(config.PORT, () => {
  console.info(`server up on port ${config.PORT}`)
})
