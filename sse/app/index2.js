import { fetchEventSource } from '@microsoft/fetch-event-source';

let index = 0;
const app = document.getElementById('app');
function sendMsg(msg) {
  fetchEventSource('http://localhost:4000/events', {
    method: 'POST',
    headers: {  
      'x-custom-header': 'hockor',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: msg
    }),
    onmessage(event) {
      console.log(event);
      if (event.event === 'newChat') {
        index++;
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', `chat-${index}`);
        newDiv.setAttribute('class', 'content');
        newDiv.innerHTML = `
          <div>
            <span>对话 ${event.data}</span>
          </div>
        `;
        app.appendChild(newDiv);
      } else {
        const chatDiv = document.getElementById(`chat-${index}`);
        chatDiv.innerHTML += event.data + '<br />';
      }
    }
  });

}

document.getElementById('sendMsg').addEventListener('click', () => {
  sendMsg(index);
});