import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { loginUser, registerUser } from "../services/auth.service"

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

export { login, register }
