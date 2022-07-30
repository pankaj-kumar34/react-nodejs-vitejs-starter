import express from 'express';
import * as handlers from '../handlers';

const router = express.Router();

// health check
router.get('/api/health', handlers.getReadiness);
router.get('/api/healthz', handlers.getLiveness);

// calculator
router.get('/api/calculator/add', handlers.add);
router.get('/api/calculator/subtract', handlers.subtract);
router.get('/api/calculator/multiply', handlers.multiply);
router.get('/api/calculator/divide', handlers.divide);

export default router;
