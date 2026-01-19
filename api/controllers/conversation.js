import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getOrCreateConversation = (req, res) => {
    const token = req.cookies.accesstoken;

    if (!token) {
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }

        const userId = userInfo.id;
        const otherUserId = parseInt(req.params.userId);

        if (userId === otherUserId) {
            return res.status(400).json("You cannot message yourself");
        }

        db.query("BEGIN", (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            // Check if conversation already exists
            const checkQuery = `
                SELECT c.id
                FROM enmateschema.conversations c
                JOIN enmateschema.conversation_members m1
                  ON c.id = m1.conversation_id
                JOIN enmateschema.conversation_members m2
                  ON c.id = m2.conversation_id
                WHERE m1.user_id = $1
                  AND m2.user_id = $2
                FOR UPDATE
            `;

            db.query(checkQuery, [userId, otherUserId], (err, data) => {
                if (err) {
                    return db.query("ROLLBACK", () => {
                        console.log(err);
                        return res.status(500).json(err);
                    });
                }

                // Conversation already exists
                if (data.rows.length > 0) {
                    return db.query("COMMIT", () => {
                        return res.status(200).json(data.rows[0]);
                    });
                }

                // Create new conversation
                const createConversationQuery = `
                    INSERT INTO enmateschema.conversations
                    DEFAULT VALUES
                    RETURNING id
                `;

                db.query(createConversationQuery, [], (err, result) => {
                    if (err) {
                        return db.query("ROLLBACK", () => {
                            console.log(err);
                            return res.status(500).json(err);
                        });
                    }

                    const conversationId = result.rows[0].id;

                    //  Insert both users into conversation_members
                    const addMembersQuery = `
                        INSERT INTO enmateschema.conversation_members
                        (conversation_id, user_id)
                        VALUES ($1,$2),($1,$3)
                    `;

                    db.query(
                        addMembersQuery,
                        [conversationId, userId, otherUserId],
                        (err) => {
                            if (err) {
                                return db.query("ROLLBACK", () => {
                                    console.log(err);
                                    return res.status(500).json(err);
                                });
                            }

                            db.query("COMMIT", () => {
                                return res.status(201).json({ id: conversationId });
                            });
                        }
                    );
                });
            });
        });
    });
};
