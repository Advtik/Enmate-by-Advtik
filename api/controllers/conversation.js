import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getOrCreateConversation = async (req, res) => {
  const token = req.cookies.accesstoken;

  if (!token) {
    return res.status(401).json("Not Logged in!");
  }

  let userInfo;
  try {
    userInfo = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json("Token is invalid");
  }

  const userId = userInfo.id;
  const otherUserId = parseInt(req.params.userId);

  if (isNaN(otherUserId)) {
    return res.status(400).json("Invalid userId");
  }

  if (userId === otherUserId) {
    return res.status(400).json("You cannot message yourself");
  }

  try {
    await db.query("BEGIN");

    // 1️⃣ Check if conversation already exists
    const checkQuery = `
      SELECT c.id AS conversation_id
      FROM enmateschema.conversations c
      JOIN enmateschema.conversation_members m1
        ON c.id = m1.conversation_id
      JOIN enmateschema.conversation_members m2
        ON c.id = m2.conversation_id
      WHERE m1.user_id = $1
        AND m2.user_id = $2
      FOR UPDATE
    `;

    const existing = await db.query(checkQuery, [userId, otherUserId]);

    let conversationId;

    if (existing.rows.length > 0) {
      // Conversation already exists
      conversationId = existing.rows[0].conversation_id;
    } else {
      // 2️⃣ Create new conversation
      const createConversationQuery = `
        INSERT INTO enmateschema.conversations
        DEFAULT VALUES
        RETURNING id
      `;

      const convoRes = await db.query(createConversationQuery);
      conversationId = convoRes.rows[0].id;

      // 3️⃣ Add both users to conversation_members
      const addMembersQuery = `
        INSERT INTO enmateschema.conversation_members
        (conversation_id, user_id)
        VALUES ($1,$2),($1,$3)
      `;

      await db.query(addMembersQuery, [
        conversationId,
        userId,
        otherUserId,
      ]);
    }

    // 4️⃣ Fetch other user's info
    const userQuery = `
      SELECT 
        id AS user_id,
        username,
        name,
        profilepic
      FROM enmateschema.users
      WHERE id = $1
    `;

    const userData = await db.query(userQuery, [otherUserId]);

    await db.query("COMMIT");

    // 5️⃣ Final response (STABLE SHAPE)
    return res.status(200).json({
      conversation_id: conversationId,
      ...userData.rows[0],
    });

  } catch (err) {
    await db.query("ROLLBACK");
    console.error(err);
    return res.status(500).json("Something went wrong");
  }
};
