/* 
function onSuccess() {
    console.log('success!');
}

function onError() {
    console.log('poop emoji');
}

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    },2000)
})

promise.then(onSuccess);
promise.catch(onError);
 */

/////////////////////////

/* 
function showError(e) {
  console.warn("Error", e);
}

function updateUI(info) {
  $("app").text(JSON.stringify(info));
}

function getLocationURL([city, state]) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20from%20weather.forecast%20were%20woeid`;
}

const id = "mikerosends";

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON;
    ({
      url: `https://api.github.com/users/${id}`,
      onSuccess: resolve,
      onFailure: reject,
    });
  });
}

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON;
    ({
      url: getLocationURL(user.location.split(",")),
      onSuccess: resolve,
      onFailure: reject,
    });
  });
}

$("#btn").on("click", () => {
  const userPromise = getUser("mikerosends");

  userPromise.then(() => {
    const weatherPromise = getWeather(user);
    weatherPromise.then((weather) => {
      updateUI({
        user,
        weather: weather.query.results,
      });
    });
    weatherPromise.catch(showError);
  });
  userPromise.catch(showError);
});
 */

//////////////////////////

function getPromise() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

function logA() {
  console.log("A");
}

function logB() {
  console.log("B");
}

function logCAndThrow() {
  console.log("C");

  throw new Error();
}

function catchError() {
  console.log("Error!!!!!");
}

getPromise().then(logA).then(logB).then(logCAndThrow).catch(catchError)
