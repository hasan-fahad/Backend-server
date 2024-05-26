import express, { Application, NextFunction, Request, Response, Router } from 'express'

import cors from 'cors'
import notFound from './app/modules/middleware/notFound'
import globalErrorHandler from './app/modules/middleware/globalErrorHandler'


const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

//applications routes
app.use('/api/v1', Router)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// global error handler call

app.use(globalErrorHandler);

//Not Found call
app.use(notFound);

export default app
