/**
 * Used to load and execute javascript file. an be used cross-domain seamlessly.
 * @param file JS file name
 * @param callback Subscribe to get notified when script file is loaded
 **/
var require = function(file, callback) {
  // create script element

  var script = document.createElement("script");
  script.src = file;

  // monitor script loading
  // IE < 7, does not support onload
  if (callback) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        // no need to be notified again
        script.onreadystatechange = null;
        // notify user
        callback();
      }
    };

    // other browsers
    script.onload = function () {
      callback();
    };
  }

  // append and execute script
  document.documentElement.firstChild.appendChild(script);
}
