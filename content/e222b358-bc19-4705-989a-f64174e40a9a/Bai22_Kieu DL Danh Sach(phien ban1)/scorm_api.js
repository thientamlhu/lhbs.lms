/**
 * SCORM 1.2 Standard Runtime API Wrapper
 * Fully compatible with Moodle LMS 2.x, 3.x, 4.x, 5.x
 * Supports nested iframes, popups, and secure sandbox environments
 */
(function(window) {
  'use strict';

  var SCORM = {
    version: '1.2',
    api: null,
    isInitialized: false,

    findAPI: function(win) {
      var attempts = 0;
      var maxAttempts = 15;
      while (win && attempts < maxAttempts) {
        attempts++;
        try {
          if (win.API) {
            return win.API;
          }
          if (!win.parent || win.parent === win) {
            break;
          }
          win = win.parent;
        } catch (e) {
          // Cross-origin frame boundary encountered safely
          break;
        }
      }
      return null;
    },

    getAPI: function() {
      if (this.api) return this.api;
      try {
        if (typeof window === 'undefined') return null;
        if (window.API) {
          this.api = window.API;
          return this.api;
        }
        try {
          if (window.parent && window.parent !== window) {
            this.api = this.findAPI(window.parent);
            if (this.api) return this.api;
          }
        } catch (e) {}
        try {
          if (window.top && window.top !== window) {
            if (window.top.API) {
              this.api = window.top.API;
              return this.api;
            }
          }
        } catch (e) {}
        try {
          if (window.opener) {
            if (window.opener.API) {
              this.api = window.opener.API;
              return this.api;
            }
            this.api = this.findAPI(window.opener);
            if (this.api) return this.api;
          }
        } catch (e) {}
      } catch (e) {
        // Safe fallback
      }
      return this.api;
    },

    initialize: function() {
      var api = this.getAPI();
      if (api) {
        try {
          var res = api.LMSInitialize('');
          this.isInitialized = (res === 'true' || res === true);
          return this.isInitialized;
        } catch (e) {
          console.warn('LMSInitialize failed:', e);
        }
      }
      return false;
    },

    getValue: function(key) {
      var api = this.getAPI();
      if (api && this.isInitialized) {
        try {
          return api.LMSGetValue(key) || '';
        } catch (e) {}
      }
      return '';
    },

    setValue: function(key, val) {
      var api = this.getAPI();
      if (api && this.isInitialized) {
        try {
          var res = api.LMSSetValue(key, String(val));
          return (res === 'true' || res === true);
        } catch (e) {}
      }
      return false;
    },

    commit: function() {
      var api = this.getAPI();
      if (api && this.isInitialized) {
        try {
          return (api.LMSCommit('') === 'true');
        } catch (e) {}
      }
      return false;
    },

    finish: function() {
      var api = this.getAPI();
      if (api && this.isInitialized) {
        try {
          this.commit();
          var res = api.LMSFinish('') === 'true';
          this.isInitialized = false;
          return res;
        } catch (e) {}
      }
      return false;
    }
  };

  window.SCORM_WRAPPER = SCORM;
})(window);
