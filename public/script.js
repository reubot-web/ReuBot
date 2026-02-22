const socket = io();

// Listen for incoming messages
socket.on('chat message', (msg) => {
  const list = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = msg;
  list.appendChild(item);
});

// Send message
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('m');
  if (input.value.trim() !== '') {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
