// controllers/profileController.js
import profileSevice from "../services/profile-service.js";
import { responseFormat } from "../utils/helper.js";

const profileController = {
  // GET /profiles
  async getAllProfile(req, res) {
    try {
      const profiles = await profileSevice.getAllProfile();
      res
        .status(200)
        .json(responseFormat("success", profiles, "All profiles fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /profiles/:id
  async getProfileById(req, res) {
    try {
      const profile = await profileSevice.getProfileById(parseInt(req.params.id));
      if (!profile) {
        return res
          .status(404)
          .json({ success: false, message: "Profile not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", profile, "Profile fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /profiles/email/:email
  async getProfileByEmail(req, res) {
    try {
      const { email } = req.params;
      const profile = await profileSevice.getProfileByEmail(email);
      if (!profile) {
        return res
          .status(404)
          .json({ success: false, message: "Profile not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", profile, "Profile fetched by email"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /profiles/:id
  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body };

      // kalau ada file foto (uploadProfile.single("foto"))
      if (req.file) {
        data.foto = req.file.filename;
      }

      const updated = await profileSevice.updateProfile(parseInt(id), data, req.user?.id);
      res
        .status(200)
        .json(responseFormat("success", updated, "Profile updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /profiles/:id
  async deleteProfile(req, res) {
    try {
      const profile = await profileSevice.deleteProfile(
        parseInt(req.params.id),
        req.user?.id
      );
      res
        .status(200)
        .json(responseFormat("success", profile, "Profile deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default profileController;