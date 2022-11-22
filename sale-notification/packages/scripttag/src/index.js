import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';
import moment from "moment";

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, settings} = await apiManager.getNotifications();
  const {maxPopsDisplay} = settings;

  const notiList = notifications.sort((prev, current) => {
    return moment(current.timestamp).valueOf() - moment(prev.timestamp).valueOf()
  }).slice(0, settings.maxPopsDisplay - 1)


  setTimeout(() => {
    displayManager.initialize({notifications: notiList, settings});
  }, settings.firstDelay * 1000)
})()

