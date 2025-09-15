import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { listLinks, createLink, updateLink, deleteLink } from '../controllers/linkController.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(listLinks));
router.post('/', requireAuth, asyncHandler(createLink));
router.patch('/:id', requireAuth, asyncHandler(updateLink));
router.delete('/:id', requireAuth, asyncHandler(deleteLink));

export default router;


