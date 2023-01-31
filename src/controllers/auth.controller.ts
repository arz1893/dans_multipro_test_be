import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { getUserById, loginUser, registerUser } from "../services/auth.service"
import jwt from "jsonwebtoken"

async function login(req: Request, res: Response) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const response = await loginUser(req)

    if(response.result) {
        return res.send({
            statusCode: 200,
            status: 'success',
            message: response.message,
            data: response.data
        })
    }

    return res.status(response.statusCode ?? 500).send({
        statusCode: response.statusCode ?? 500,
        status: 'error',
        message: response.message,
        data: response.data
    })
}

async function register(req: Request, res: Response) {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const response = await registerUser(req)
    if(response.result) {
        return res.status(201).send({
            statusCode: 201,
            status: 'success',
            message: response.message
        })
    } else {
        return res.status(500).send({
            statusCode: 500,
            status: 'error',
        })
    }
}

async function getUserProfile(req: Request, res: Response) {
    const bearerToken = req.headers.authorization
    const token = bearerToken?.split(' ')[1]

    if(token) {
        const decoded: any = jwt.verify(token, String(process.env.APP_SECRET))
        console.log('decoded token : ', decoded)
        const foundUser: any = await getUserById(decoded.id)

        if(foundUser.result) {
            return res.send({
                statusCode: 200,
                status: 'success',
                data: {
                    id: foundUser.data.id,
                    username: foundUser.data.username
                }
            })
        }

        return res.status(401).send({
            statusCode: 401,
            status: 'error',
            message: "There is no user found with this credential"
        })
    }

    return res.status(401).send({
        statusCode: 401,
        status: 'error',
        message: "You're not authorized"
    })
}

export { login, register, getUserProfile }
