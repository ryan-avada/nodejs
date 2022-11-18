import Router from 'koa-router';
import * as sampleController from '../controllers/sampleController';
import settingsController from "../controllers/settingsController";
import notificationsController from "../controllers/notificationsController"
import {verifyRequest} from '@avada/shopify-auth';

const router = new Router({
  prefix: '/api'
});

router.use(verifyRequest());

router.get('/samples', sampleController.exampleAction);

router.get('/settings', settingsController.get);
router.put('/settings', settingsController.update);

router.get('/notifications', notificationsController.get);

export default router;
