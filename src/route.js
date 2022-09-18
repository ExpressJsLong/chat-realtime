let fakeMessage = [
  {
    id: 1,
    from: 1,
    to: 2,
    createdAt: "2022-09-05 21:51:49",
    updatedAt: "2022-09-05 22:03:16",
    content: "admin chat",
    status: "SEEN",
    target: "USER",
  },
  {
    id: 2,
    from: 2,
    to: 1,
    createdAt: "2022-09-05 21:51:56",
    updatedAt: "2022-09-05 22:03:16",
    content: "admin chat pinted",
    status: "PINTED",
    target: "USER",
  },
  {
    id: 3,
    from: 1,
    to: 2,
    createdAt: "2022-09-05 21:52:01",
    updatedAt: "2022-09-05 22:03:16",
    content: "admin chat deleted",
    status: "DELETED",
    target: "USER",
  },
  {
    id: 5,
    from: 1,
    to: 1,
    createdAt: "2022-09-05 22:39:06",
    updatedAt: "2022-09-05 22:39:06",
    content: "Hế lô ae",
    status: "SEEN",
    target: "GROUP",
  },
  {
    id: 6,
    from: 2,
    to: 1,
    createdAt: "2022-09-05 22:39:17",
    updatedAt: "2022-09-05 22:39:17",
    content: "Hế lô hê hê",
    status: "SEEN",
    target: "GROUP",
  },
  {
    id: 7,
    from: 2,
    to: 1,
    createdAt: "2022-09-05 22:39:29",
    updatedAt: "2022-09-05 22:39:29",
    content: "Ahihi",
    status: "SEEN",
    target: "GROUP",
  },
  {
    id: 8,
    from: 3,
    to: 1,
    createdAt: "2022-09-05 22:39:40",
    updatedAt: "2022-09-05 22:39:40",
    content: "Ahihi hê hê!",
    status: "SEEN",
    target: "GROUP",
  },
];

const fakeGroup = [
  {
    groupId: 1,
    userId: 1,
  },
  {
    groupId: 1,
    userId: 2,
  },
  {
    groupId: 1,
    userId: 3,
  },
  {
    groupId: 2,
    userId: 2,
  },
  {
    groupId: 2,
    userId: 3,
  },
];

export function insertMessages(payload) {
  payload.content = payload.msg;
  fakeMessage.push(payload);
}

export function getGroupMembers(groupId) {
  return fakeGroup.filter((item) => item.groupId == groupId);
}

export function route(app) {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.post("/messages", (req, res, next) => {
    console.log(req.body);
    const from = Number(req.body.from);
    const to = Number(req.body.to);
    const target = req.body.target;

    const messages = fakeMessage.filter((messages) => {
      if (target == "USER") {
        return (
          ((messages.from == from && messages.to == to) ||
            (messages.from == to && messages.to == from)) &&
          messages.target == target
        );
      } else {
        return messages.to == to && messages.target == target;
      }
    });
    res.json({ payload: messages });
  });
}
