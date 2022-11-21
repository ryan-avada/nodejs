import App from 'koa';
import router from '../routes/webhook';

// Initialize all demand configuration for an application
const webhook = new App();
webhook.proxy = true;

// Register all routes for the application
webhook.use(router.allowedMethods());
webhook.use(router.routes());


export default webhook;
