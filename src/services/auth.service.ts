import { Request } from "express"
import bcrypt, { hash } from 'bcrypt'
import database from "../db_config"
import jwt from 'jsonwebtoken'

async function loginUser(req: Request) {
    const { username, password } = req.body

    const foundUser = database.prepare('SELECT * FROM users WHERE username = ?').get(username)
    console.log('found user : ', foundUser)

    if(foundUser) {
        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)

        if(isPasswordCorrect) {
            const token = jwt.sign({ id: foundUser.id, username }, String(process.env.APP_SECRET), { 'expiresIn': '1d' })

            return {
                result: true,
                message: 'Login successful!',
                data: {
                    user: {
                        id: foundUser.id,
                        username,
                    },
                    token
                }
            }
        }

        return {
            result: false,
            statusCode: 401,
            message: 'Invalid password!'
        }
    }

    return {
        result: false,
        statusCode: 401,
        message: 'There is no user with this username'
    }
}

async function registerUser(req: Request) {
    const { username, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const insert = database.prepare('INSERT INTO users(username, password, salt) VALUES (?, ?, ?)')
    const result = insert.run(username, hashedPassword, salt)

    console.log('register user result : ', result)

    if(result) {
        return {
            result: true,
            message: 'New user has been added!'
        }
    }

    return {
        result: false,
        message: 'There is something wrong within the process'
    }
}

export { loginUser, registerUser }
