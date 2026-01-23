import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getMessages = (req, res) => {
    const token = req.cookies.accesstoken;

    if (!token) {
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }

        const userId = userInfo.id;
        const conversationId = parseInt(req.params.conversationId);

        const checkMemberQuery = `
            SELECT *
            FROM enmateschema.conversation_members
            WHERE conversation_id = $1 AND user_id = $2
        `;

        db.query(checkMemberQuery, [conversationId, userId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (result.rows.length === 0) {
                return res.status(403).json("You are not part of this conversation");
            }

            const getMessagesQuery = `
                SELECT 
                    m.id,
                    m.conversation_id,
                    m.sender_id,
                    m.text,
                    m.created_at,
                    u.name,
                    u.profilepic
                FROM enmateschema.messages m
                JOIN enmateschema.users u
                  ON u.id = m.sender_id
                WHERE m.conversation_id = $1
                ORDER BY m.created_at ASC
            `;

            db.query(getMessagesQuery, [conversationId], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.status(200).json(data.rows);
            });
        });
    });
};

export const sendMessage = (req, res) => {
    const token = req.cookies.accesstoken;

    if (!token) {
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }

        const senderId = userInfo.id;
        const conversationId = parseInt(req.body.conversationId);
        const text = req.body.text;

        if (!conversationId || !text) {
            return res.status(400).json("Missing required fields");
        }

        const checkMemberQuery = `
            SELECT 1
            FROM enmateschema.conversation_members
            WHERE conversation_id = $1 AND user_id = $2
        `;

        db.query(checkMemberQuery, [conversationId, senderId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (result.rows.length === 0) {
                return res.status(403).json("You are not part of this conversation");
            }

            const insertMessageQuery = `
                INSERT INTO enmateschema.messages
                (conversation_id, sender_id, text)
                VALUES ($1, $2, $3)
                RETURNING id, conversation_id, sender_id, text, created_at
            `;

            db.query(
                insertMessageQuery,
                [conversationId, senderId, text],
                (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    return res.status(201).json(data.rows[0]);
                }
            );
        });
    });
};

