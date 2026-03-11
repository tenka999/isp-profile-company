import userService from "../services/user-service.js";
import { responseFormat } from "../utils/helper.js";
// import
import prisma from "../config/database.js";

const userController = {
  async getAllUsers(req, res) {
    try {
      console.log("test");
      const users = await userService.getAllUsers();
      res
        .status(200)
        .json(responseFormat("success", users, "All users fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));

      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      res.status(200).json(responseFormat("success", user, "User fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getUserByEmail(req, res) {
    try {
      const { email } = req.params;

      const user = await userService.getUserByEmail(email);

      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      res.status(200).json(responseFormat("success", user, "User fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(responseFormat("success", user, "User created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", user, "User updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteUser(req, res) {
    console.log("testasda");
    try {
      const user = await userService.deleteUser(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", user, "User deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // const softDeleteUsers = async (req, res) => {
  async deleteSelectedUsers(req, res) {
    const { ids } = req.body;

    await prisma.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        // isDeleted: true,
        deletedAt: new Date(),
      },
    });

    res.status(200).json(responseFormat("success", null, "Users deleted"));
  },

  // export const restoreUsers = async (req, res) => {
  async restoreSelectedUsers(req, res) {
    const { ids } = req.body;

    await prisma.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        // isDeleted: false,
        deletedAt: null,
      },
    });

    res.json({
      success: true,
      message: "Users restored",
    });
  },
};

export default userController;
