



var callback = function(){
  // Handler when the DOM is fully loaded

  console.log('Front end application ready');





  
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}