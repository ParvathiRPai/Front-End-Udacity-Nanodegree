let userConsent = false;

/**
 * delay your service worker's initial registration until after the first page has loaded
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    new IndexController();
  });
}

function IndexController() {
  this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function() {
  // Check if browser supports service worker
  if (!navigator.serviceWorker) return;

  let indexController = this;

  // register new service worker (if not present in the given scope)
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    console.log('ServiceWorker registration successful with scope: ', reg.scope);

  /**
   * If there is no controller means this page didn't load using
   * service worker hence the content is loaded from the n/w
   */
    if (!navigator.serviceWorker.controller) {
      return;
    }

    // Check if there is a waiting worker if so then inform the user about the update
    if (reg.waiting) {
      indexController._updateReady(reg.waiting);
      return;
    }

    // Check if there is a installing service worker if so then track it's state
    if (reg.installing) {
      indexController._trackInstalling(reg.installing);
      return;
    }

  /**
   * listen for the service worker's updatefound event, if it fires
   * then track its state
   */
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      const newWorker = reg.installing;
      indexController._trackInstalling(newWorker);
    });
  // catch any error during service worker registration
  }).catch((err) =>{
    console.log('ServiceWorker registration failed: ', err);
  });

  /**
   * This fires when the service worker controlling this page
   * changes, eg a new worker has skipped waiting and become
   * the new active worker.
   */
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
};

/**
 * listen for the installing service worker state
 * and if installed we inform the user about update
 */
IndexController.prototype._trackInstalling = function(worker) {
  let indexController = this;
  worker.addEventListener('statechange', () => {
    // newWorker.state has changed
    if (worker.state == 'installed') {
      indexController._updateReady(worker);
    }
  });
};

IndexController.prototype._updateReady = function (worker) {
  userConsent = confirm("New version available. Do you want to update?");

  if (!userConsent) return;
  // tell the service worker to skipWaiting
  // console.log('updateSW');
  worker.postMessage('updateSW');

};
