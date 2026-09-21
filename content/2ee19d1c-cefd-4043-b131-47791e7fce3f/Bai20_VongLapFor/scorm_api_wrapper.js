/**
 * Standard SCORM 1.2 & SCORM 2004 API Wrapper
 * Fully compliant with Moodle LMS (v2.x, v3.x, v4.x), Canvas LMS, and SCORM Cloud
 */
(function (global) {
  'use strict';

  var API = null;
  var API_VERSION = null;
  var isInitialized = false;

  function findAPI(win) {
    var findAttempts = 0;
    var findAttemptLimit = 500;
    var currentWin = win;

    while (currentWin && !currentWin.API && !currentWin.API_1484_11 && currentWin.parent && currentWin.parent !== currentWin && findAttempts < findAttemptLimit) {
      findAttempts++;
      try {
        currentWin = currentWin.parent;
      } catch (err) {
        break;
      }
    }

    if (currentWin) {
      try {
        if (currentWin.API) {
          API = currentWin.API;
          API_VERSION = '1.2';
          return API;
        }
        if (currentWin.API_1484_11) {
          API = currentWin.API_1484_11;
          API_VERSION = '2004';
          return API;
        }
      } catch (e) {}
    }

    // Try opener if window was opened as a popup
    try {
      if (win.opener && !win.opener.closed) {
        var opWin = win.opener;
        var opAttempts = 0;
        while (opWin && !opWin.API && !opWin.API_1484_11 && opWin.parent && opWin.parent !== opWin && opAttempts < findAttemptLimit) {
          opAttempts++;
          try {
            opWin = opWin.parent;
          } catch (e) {
            break;
          }
        }
        if (opWin) {
          if (opWin.API) {
            API = opWin.API;
            API_VERSION = '1.2';
            return API;
          }
          if (opWin.API_1484_11) {
            API = opWin.API_1484_11;
            API_VERSION = '2004';
            return API;
          }
        }
      }
    } catch (e) {}

    return null;
  }

  function getAPI() {
    if (API === null) {
      API = findAPI(global);
    }
    return API;
  }

  var ScormWrapper = {
    version: function () {
      getAPI();
      return API_VERSION;
    },
    isAvailable: function () {
      return Boolean(getAPI());
    },
    init: function () {
      var api = getAPI();
      if (!api) return false;
      if (isInitialized) return true;

      var result = false;
      try {
        if (API_VERSION === '1.2') {
          result = api.LMSInitialize('') === 'true';
        } else if (API_VERSION === '2004') {
          result = api.Initialize('') === 'true';
        }
      } catch (e) {
        result = false;
      }
      isInitialized = result;
      return result;
    },
    get: function (param) {
      var api = getAPI();
      if (!api || !isInitialized) return '';
      try {
        if (API_VERSION === '1.2') {
          return api.LMSGetValue(param) || '';
        } else if (API_VERSION === '2004') {
          return api.GetValue(param) || '';
        }
      } catch (e) {
        return '';
      }
      return '';
    },
    set: function (param, value) {
      var api = getAPI();
      if (!api || !isInitialized) return false;
      try {
        if (API_VERSION === '1.2') {
          return api.LMSSetValue(param, String(value)) === 'true';
        } else if (API_VERSION === '2004') {
          return api.SetValue(param, String(value)) === 'true';
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    commit: function () {
      var api = getAPI();
      if (!api || !isInitialized) return false;
      try {
        if (API_VERSION === '1.2') {
          return api.LMSCommit('') === 'true';
        } else if (API_VERSION === '2004') {
          return api.Commit('') === 'true';
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    finish: function () {
      var api = getAPI();
      if (!api || !isInitialized) return false;
      try {
        if (API_VERSION === '1.2') {
          api.LMSCommit('');
          api.LMSFinish('');
        } else if (API_VERSION === '2004') {
          api.Commit('');
          api.Terminate('');
        }
      } catch (e) {}
      isInitialized = false;
      return true;
    },
    getStudentName: function () {
      var name = this.get(API_VERSION === '2004' ? 'cmi.learner_name' : 'cmi.core.student_name');
      if (name && name.indexOf(',') !== -1) {
        var parts = name.split(',');
        if (parts.length >= 2) return (parts[1].trim() + ' ' + parts[0].trim());
      }
      return name || '';
    },
    setScore: function (raw, max, min) {
      max = max !== undefined ? max : 100;
      min = min !== undefined ? min : 0;
      var numRaw = Math.round(Number(raw) || 0);
      if (API_VERSION === '2004') {
        this.set('cmi.score.raw', numRaw);
        this.set('cmi.score.max', max);
        this.set('cmi.score.min', min);
        this.set('cmi.score.scaled', (numRaw / max).toFixed(2));
      } else {
        this.set('cmi.core.score.raw', numRaw);
        this.set('cmi.core.score.max', max);
        this.set('cmi.core.score.min', min);
      }
      this.commit();
      return true;
    },
    setStatus: function (status) {
      if (API_VERSION === '2004') {
        if (status === 'passed' || status === 'failed') {
          this.set('cmi.success_status', status);
          this.set('cmi.completion_status', 'completed');
        } else {
          this.set('cmi.completion_status', status);
        }
      } else {
        this.set('cmi.core.lesson_status', status);
      }
      this.commit();
      return true;
    }
  };

  global.ScormWrapper = ScormWrapper;

  // Auto-commit and finish when closing tab / navigating away in Moodle
  global.addEventListener('beforeunload', function () {
    try {
      ScormWrapper.finish();
    } catch (e) {}
  });

})(typeof window !== 'undefined' ? window : this);
