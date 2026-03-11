import artikelService from "../services/artikel-service.js";
import { responseFormat } from "../utils/helper.js";
import slugify from "slugify";
import prisma from "../config/database.js";
import fs from "fs";
import path, { parse } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artikelController = {
  async getAll(req, res) {
    try {
      const data = await artikelService.getAll();
      res.status(200).json(responseFormat("success", data, "Artikel fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await artikelService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Artikel not found" });

      res.status(200).json(responseFormat("success", data, "Artikel fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async getBySlug(req, res) {
    try {
      const data = await artikelService.getBySlug(req.params.slug);

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Artikel not found" });

      res.status(200).json(responseFormat("success", data, "Artikel fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = { ...req.body };

      if (!data.slug) {
        data.slug = slugify(data.judul, { lower: true });
      }

      if (req.file) {
        data.gambar = req.file.filename;
      }

      console.log("FINAL DATA:", data);
      console.log("FILE:", req.file);

      const result = await artikelService.create(data);

      res
        .status(201)
        .json(responseFormat("success", result, "Artikel created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);

      // 🔥 Ambil data lama dulu
      const existing = await artikelService.getById(id);

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Artikel tidak ditemukan",
        });
      }

      let data = { ...req.body };

      // generate slug otomatis kalau perlu
      if (data.judul && !data.slug) {
        data.slug = slugify(data.judul, { lower: true });
      }

      // 🔥 Kalau ada file baru diupload
      if (req.file) {
        // Hapus file lama jika ada
        if (existing.gambar) {
          const oldPath = path.join(
            __dirname,
            "../uploads/article",
            existing.gambar,
          );

          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }

        // Simpan filename baru
        data.gambar = req.file.filename;
      } else {
        // Kalau tidak upload gambar baru, pakai gambar lama
        data.gambar = existing.gambar;
      }

      const result = await artikelService.update(id, data);

      res
        .status(200)
        .json(responseFormat("success", result, "Artikel updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await artikelService.remove(parseInt(req.params.id));

      res
        .status(200)
        .json(responseFormat("success", result, "Artikel deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async deletes(req, res) {
    try {
      const { ids } = req.body;
      console.log("ids", ids);

      if (!ids || !ids.length) {
        return res.status(400).json({
          success: false,
          message: "IDs kosong",
        });
      }

      await prisma.artikel.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.json({
        success: true,
        message: "Artikel berhasil dihapus",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};

export default artikelController;
