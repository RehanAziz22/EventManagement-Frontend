import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Button,
    Paper,
    Avatar,
} from "@mui/material";

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [users, setUsers] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        // Fetch all users
        axios.get("http://localhost:3000/api/user").then((res) => {
            setUsers(res.data.data);
        });
    }, []);

    const openChat = async (userId) => {
        try {
            const res = await axios.post("http://localhost:3000/api/chat", {
                userId: currentUser._id, // Replace with current user's ID
                participantId: userId,
            });
            setSelectedChat(res.data.chat);
            setMessages(res.data.chat.messages);
            setParticipants(res.data.chat.participants);
        } catch (error) {
            console.error("Error opening chat:", error);
        }
    };

    const sendMessage = async () => {
        if (!message) return;

        try {
            const res = await axios.post("http://localhost:3000/api/chat/message", {
                chatId: selectedChat._id,
                senderId: currentUser._id, // Replace with current user's ID
                content: message,
            });
            setMessages(res.data.chat.messages);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Box display="flex" height="70vh" overflow={'none'} bgcolor="#f5f5f5">
            {/* Sidebar */}
            <Paper
                elevation={3}
                sx={{
                    width: "30%",
                    borderRight: "1px solid #ccc",
                    padding: "16px",
                    height: "70vh",
                    overflowY: "scroll",
                }}
            >
                <List>
                    {users.map((user) => {
                        if (user._id === currentUser._id) return null;
                        return (
                            <ListItem key={user._id} disablePadding sx={{  borderBottom: "1px solid #ccc" }}>
                                <ListItemButton onClick={() => openChat(user._id)}>
                                    <Avatar sx={{ marginRight: 2, backgroundColor: "#3f51b5" }} src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg">
                                        {user.name.charAt(0)} {/* Display the first letter of the user's name */}
                                    </Avatar>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                                        <ListItemText
                                            primary={user.name}
                                            primaryTypographyProps={{ fontWeight: "bold" }}
                                        />
                                        <ListItemText
                                            primary={user.role}
                                            primaryTypographyProps={{
                                                fontSize: "14px",
                                                color: "gray",
                                                textAlign: "left",
                                            }}
                                        />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>

            {/* Chat Area */}
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                bgcolor="#ffffff"
                borderRadius="8px"
                overflow="hidden"

            >
                {selectedChat ? (
                    <>
                        {/* Messages */}
                        <Box
                            sx={{
                                // flex: 1,
                                height: "60vh",
                                padding: "16px",
                                overflowY: "scroll",
                                borderBottom: "1px solid #ccc",
                                backgroundColor: "#272822",
                                color: "white"
                            }}
                        >
                            {messages.map((msg, index) => (
                                <Typography key={index} variant="body1" mb={1}>
                                    <strong>
                                        {participants.find(
                                            (participant) => participant._id === msg?.sender
                                        )?.name || msg.sender?.name || "Unknown"}
                                        :
                                    </strong>{" "}
                                    {msg.content}
                                </Typography>
                            ))}
                        </Box>

                        {/* Input */}
                        <Box
                            display="flex"
                            alignItems="center"
                            padding="16px"
                            bgcolor="#f9f9f9"
                            borderTop="1px solid #ccc"
                        >
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{ marginRight: "8px" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={sendMessage}
                            >
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="#000"
                        height="60vh"

                    >
                        <Typography variant="h5" color="white">
                            Select a user to start chatting
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ChatPage;
