import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatLobby = ({ goToChatRoom, currentUser }) => {
  const { chatRooms } = useContext(ChatContext);

  const getReceiver = (participants) => {
    return participants[0].id !== currentUser.id
      ? participants[0]
      : participants[1];
  };

  return (
    <div id="chat-contacts-container" className="col-12">
      {chatRooms &&
        chatRooms.map((room) => {
          let receiver = getReceiver(room.participants);
          return (
            <div
              className="mb-2 mt-2 grey-background tradeHub-white p-2 pl-3 pr-3 borderRadius5 pointer"
              onClick={() => {
                goToChatRoom({ roomId: room.id, targetId: receiver.id });
              }}
            >
              {receiver.fullName}
            </div>
          );
        })}
    </div>
  );
};

export default ChatLobby;
