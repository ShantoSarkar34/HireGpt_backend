import { dynamoDB, TABLE_NAME } from "../config/awsConfig.js";

export const createCourse = async (req, res) => {
  try {
    const { courseId, title, description } = req.body;

    const params = {
      TableName: TABLE_NAME,
      Item: {
        PK: `COURSE#${courseId}`,
        SK: "DETAILS",
        courseId,
        title,
        description,
        createdAt: Date.now(),
      },
    };

    await dynamoDB.put(params).promise();
    res.status(201).json({ success: true, message: "Course created!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
