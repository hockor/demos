const evtSource = new EventSource("http://localhost:4000/events");

evtSource.onmessage = function(event) {
  console.log(event.data);
  const app = document.getElementById('app');
  app.innerHTML += event.data + '<br />';
}

evtSource.onerror = function(event) {
  console.log(event.data);
}