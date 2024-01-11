document.addEventListener("DOMContentLoaded", function () {
  // Replace with your user's ID (you need to get this from your application)
  const userId = localStorage.getItem("userid");
  let selectedOtherUserId; // Declare the variable to store the selected otherUserId

  const recentlyContactedList = document.getElementById(
    "recentlyContactedList"
  );
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("messageInput");
  const chatList = document.getElementById("chat-messages");

  function loadChat(otherUserId) {
    // Fetch the chat between the two users
    fetch(`/chat/${userId}/${otherUserId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.messages && Array.isArray(data.messages)) {
          const messages = data.messages;

          // Clear the existing chat messages
          chatList.innerHTML = "";

          messages.forEach((message) => {
            
            const messageElement = document.createElement("div");

            if (message.user_1 != otherUserId ) {
              messageElement.classList.add("mssg-row");
            } else {
              messageElement.classList.add("other-mssg-row");
            }

            const messageText = document.createElement("div");
            messageText.classList.add("mssg-text");
            messageText.textContent = message.message;
            
            messageElement.appendChild(messageText);
            chatList.appendChild(messageElement);
          });
        } else {
          console.error("Chat messages are missing or not an array.");
        }
      })
      .catch((error) => {
        console.error("Error loading chat:", error);
      });
  }



  // Fetch the last 5 recently contacted users
  fetch(`/recentlyContactedUsers/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const recentlyContactedUsers = data.recentlyContactedUsers;

      recentlyContactedUsers.forEach((user) => {
        const li = document.createElement("li");
        li.classList.add("online");
        li.textContent = user.other_username;
        li.addEventListener("click", () => {
          selectedOtherUserId = user.other_userid;
          loadChat(selectedOtherUserId);
        });

        recentlyContactedList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading recently contacted users:", error);
    });

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = messageInput.value;

    if (message.trim() !== "" && selectedOtherUserId) {
      sendMessage(userId, selectedOtherUserId, message);
      messageInput.value = "";
    } else {
      console.error("No user selected or message is empty.");
    }
  });
});

function loadChat(otherUserId) {
  const userId = localStorage.getItem("userid");

  // Fetch the chat between the two users
  fetch(`/chat/${userId}/${otherUserId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.messages && Array.isArray(data.messages)) {
        const messages = data.messages;
        const chatList = document.getElementById("chat-messages");

        chatList.innerHTML = ""; // Clear the existing chat messages

        messages.forEach((message) => {
          const messageElement = document.createElement("div");
          messageElement.classList.add(
            message.fromUser1 ? "mssg-row" : "other-mssg-row"
          );

          const messageText = document.createElement("div");
          messageText.classList.add("mssg-text");
          messageText.textContent = message.message;

          messageElement.appendChild(messageText);
          chatList.appendChild(messageElement);
        });
      } else {
        console.error("Chat messages are missing or not an array.");
      }
    })
    .catch((error) => {
      console.error("Error loading chat:", error);
    });
}

function sendMessage(userId, otherUserId, message) {
  // Make a POST request to send the message to the server
  fetch(`/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      otherUserId,
      message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // After successfully sending the message, reload the chat history
      loadChat(otherUserId);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}