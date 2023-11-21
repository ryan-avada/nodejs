import App from 'koa';
import router from '../routes/clientApi';
import cors from '@koa/cors';

// Initialize all demand configuration for an application
const clientApi = new App();
clientApi.proxy = true;


// Register all routes for the application
clientApi.use(cors())
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

export default clientApi;
