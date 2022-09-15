export const socketEvent = {
  account: {
    login: "LOGIN",
  },
  chat: {
    typingStart: "TYPING_START",
    typingEnd: "TYPING_END",
    sendMessages: "SEND_MESSAGES",
    receiveMessages: "RECEIVE_MESSAGES",
  },
  friend: {
    online: "ONLINE",
    offline: "OFFLINE",
    requireFriend: "REQUIRE_FRIEND",
    acceptFriend: "ACCEPT_FRIEND",
  },
};
