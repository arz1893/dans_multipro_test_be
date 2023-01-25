import axios from 'axios'
import { Request, Response } from 'express'

async function getJobList(req: Request, res: Response) {
    let { description, location, full_time, page } = req.query

    let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?`
    
    if(page) url += `&page=${page}`
    if(description) url += `&description=${description}`
    if(location) url += `&location=${location}`
    if(full_time) url += `&full_time=${full_time}`

    console.log('url : ', url)

    const result = await axios.get(url).then(response => {
        return response.data
    }).catch(error => {
        return error
    })

    return res.send({
        statusCode: 200,
        status: 'success',
        data: result
    })
}

async function getJobDetail(req: Request, res: Response) {
    const id = req.params.id

    let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
    console.log('url : ', url)

    const result = await axios.get(url).then(response => {
        return response.data
    }).catch(error => {
        return error
    })

    return res.send({
        statusCode: 200,
        status: 'success',
        data: result
    })
}

export { getJobList, getJobDetail }
