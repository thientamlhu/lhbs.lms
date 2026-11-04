// SCORM 1.2 Wrapper for Moodle Standalone Execution
(function() {
  function findAPI(win) {
    var attempts = 0;
    while (win && attempts < 10) {
      try {
        if ('API' in win && win.API) return win.API;
      } catch (e) {
        break;
      }
      try {
        if (win.parent && win.parent !== win) win = win.parent;
        else if (win.opener && win.opener !== win) win = win.opener;
        else break;
      } catch (e) {
        break;
      }
      attempts++;
    }
    return null;
  }

  window.addEventListener('load', function() {
    try {
      var api = findAPI(window);
      if (api) {
        try {
          api.LMSInitialize("");
          console.log("SCORM 1.2 initialized successfully with LMS/Moodle.");
        } catch(e) { console.warn(e); }
      }
    } catch(e) {}
  });

  window.addEventListener('beforeunload', function() {
    try {
      var api = findAPI(window);
      if (api) {
        try {
          api.LMSCommit("");
          api.LMSFinish("");
        } catch(e) {}
      }
    } catch(e) {}
  });
})();
