import csMessageService from "../services/cs-message-service.js";
import { responseFormat } from "../utils/helper.js";

const customerServiceMessageController = {
  async getAll(req, res) {
    try {
      const data = await csMessageService.getMessages();
      res.status(200).json(responseFormat("success", data, "Artikel fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await csMessageService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Message sent"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default customerServiceMessageController;
