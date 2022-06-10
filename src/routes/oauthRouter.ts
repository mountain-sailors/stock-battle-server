import express from 'express';
import oauthController from '../controllers/oauthController';

const router = express.Router();

router.post('/naver', oauthController.naverLogin);
router.post('/kakao', oauthController.kakaoLogin);

export default router;
