import App from 'koa';
import router from '../routes/clientApi';
import createErrorHandler from "../middleware/errorHandler";
import errorService from "../../lib/services/errorService";

// Initialize all demand configuration for an application
const clientApi = new App();
clientApi.proxy = true;


// Register all routes for the application
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

export default clientApi;
