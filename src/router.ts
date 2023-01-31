import { Router } from "express";
import { body, check } from 'express-validator'
import { getUserProfile, login, register } from "./controllers/auth.controller";
import { authGuard } from "./middlewares/auth.middleware";
import { getJobDetail, getJobList } from "./controllers/jobs.controller";

const router = Router()

router.post('/login', 
    body('username').notEmpty().withMessage('Field username is required').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('password').notEmpty().withMessage('Field password is required').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    login
)

router.post('/register',
    body('username').notEmpty().withMessage('Field username is required').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('password').notEmpty().withMessage('Field password is required').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    register
)

router.get('/profile', authGuard, getUserProfile)
router.get('/jobs', authGuard, getJobList)
router.get('/jobs/:id', authGuard, getJobDetail)

export default router