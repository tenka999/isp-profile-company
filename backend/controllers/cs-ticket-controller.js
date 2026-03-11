import csTicketService from "../services/cs-ticket-service.js";
import { responseFormat } from "../utils/helper.js";

const customerServiceTicketController = {
  async getAll(req, res) {
    try {
      const data = await csTicketService.getAll();
      res.status(200).json(responseFormat("success", data, "Tickets fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await csTicketService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Ticket not found" });

      res.status(200).json(responseFormat("success", data, "Ticket fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await csTicketService.create(req.body);
      res.status(201).json(responseFormat("success", data, "Ticket created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await csTicketService.update(
        parseInt(req.params.id),
        req.body,
      );
      res.status(200).json(responseFormat("success", data, "Ticket updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async updateTicket(req, res) {
    try {
      const data = await csTicketService.updateTicket(
        parseInt(req.params.id),
        req.body,
      );
      res.status(200).json(responseFormat("success", data, "Ticket updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await csTicketService.remove(parseInt(req.params.id));
      res.status(200).json(responseFormat("success", data, "Ticket deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default customerServiceTicketController;
