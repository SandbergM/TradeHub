package com.example.TradeHub.controllers;

import com.example.TradeHub.entities.ChatMessage;
import com.example.TradeHub.entities.Room;
import com.example.TradeHub.services.ChatMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chatMessage")
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @GetMapping("/conversation/{id}")
    @Operation( summary = "Fetch a LIST of ChatMessages with the id of a specific Room - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = ChatMessage.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<List<ChatMessage>> getConversation(
            @Parameter( description="The id of a chatroom, String ( MongoDb uuid )" , required = true )
            @PathVariable String id
    ){
        System.out.println(id);
        return ResponseEntity.ok().body(chatMessageService.getConversation(id));
    }

    @PostMapping
    @Operation( summary = "Post/Save ONE ChatMessage - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = ChatMessage.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "403", description = "Bad Request",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public void postNewChatMessage(@RequestBody ChatMessage chatMessage) {
        chatMessageService.postNewMessage(chatMessage);
    }

    @GetMapping("/room/{id}")
    @Operation( summary = "Fetching ONE Room using a Rooms id - Authentication required" )
    @ApiResponses( value = {
            @ApiResponse(responseCode = "200", description = "Ok",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema( implementation = Room.class )) }),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = { @Content }),
            @ApiResponse(responseCode = "5XX", description = "Unexpected error",
                    content = { @Content })
    })
    public ResponseEntity<Room> getRoomId(
            @Parameter( description="The id of a chatroom, String ( MongoDb uuid )" , required = true )
            @PathVariable String id
    ) {
        return ResponseEntity.ok().body(chatMessageService.getRoom(id));
    }

    @GetMapping("/myRooms")
    public ResponseEntity<List<Room>> getCurrentUsersRooms(){
        List<Room> rooms = chatMessageService.getCurrentUsersRooms();
        return ResponseEntity.ok().body(rooms);
    }

}
