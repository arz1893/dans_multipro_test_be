import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

async function authGuard(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization

    if(bearerToken && bearerToken.split(' ')[0] == 'Bearer') {
        const token = bearerToken.split(' ')[1]

        try {
            const secret = String(process.env.APP_SECRET)
            console.log('secret : ', secret)
            const result = jwt.verify(token, secret, { algorithms: ['HS256'] })
            if(result) {
                return next()
            }

            return res.status(401).send({
                statusCode: 401,
                status: 'error',
                message: "You're not authorized"
            })

        } catch(error: any) {
            return res.status(401).send({
                statusCode: 401,
                status: 'error',
                message: error.message
            })
        }
    }

    return res.status(401).send({
        statusCode: 401,
        status: 'error',
        message: "You're not authorized"
    })
}

export { authGuard }