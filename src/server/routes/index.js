import express from 'express';
import * as handlers from '../handlers';

const router = express.Router();

// health check
router.get('/api/v1/health', handlers.getReadiness);
router.get('/api/v1/healthz', handlers.getLiveness);

// calculator
router.get('/api/v1/calculator/add', handlers.add);
router.get('/api/v1/calculator/subtract', handlers.subtract);
router.get('/api/v1/calculator/multiply', handlers.multiply);
router.get('/api/v1/calculator/divide', handlers.divide);

export default router;
