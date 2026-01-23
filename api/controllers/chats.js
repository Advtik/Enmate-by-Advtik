import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getUserConversations = (req, res) => {
    const token = req.cookies.accesstoken;

    if (!token) {
        return res.status(401).json("Not Logged in!");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err){
            return res.status(403).json("Token is invalid");
        }

        const userId = userInfo.id;

        const q = `
            SELECT
                c.id AS conversation_id,
                u.id AS user_id,
                u.username,
                u.profilepic,
                u.name,
                u.bio
            FROM enmateschema.conversations c
            JOIN enmateschema.conversation_members cm1
                ON c.id = cm1.conversation_id
            JOIN enmateschema.conversation_members cm2
                ON c.id = cm2.conversation_id
            JOIN enmateschema.users u
                ON u.id = cm2.user_id
            WHERE cm1.user_id = $1
              AND cm2.user_id != $1
            ORDER BY c.created_at DESC

        `;

        db.query(q, [userId], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json(data.rows);
        });
    });
};
