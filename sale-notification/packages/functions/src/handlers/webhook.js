import App from 'koa';
import router from '../routes/webhook';

// Initialize all demand configuration for an application
const webhook = new App();
webhook.proxy = true;

// webhook.use(createErrorHandler());

// Register all routes for the application
webhook.use(router.allowedMethods());
webhook.use(router.routes());

// Handling all errors
// webhook.on('error', errorService.handleError);

export default webhook;
