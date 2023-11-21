import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopDomain = window.location.hostname;
    const apiUrl = 'https://localhost:3000/client/notifications?shopDomain=' + shopDomain;
    const {notifications, settings} = await makeRequest({url: apiUrl});

    return {notifications, settings};
  };
}
