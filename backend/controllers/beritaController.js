const Berita = require('../models/Blog');

exports.create = async (req, res) => {
  try {
    const { title, slug, content, author, category, tags } = req.body || {};
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan konten berita diperlukan' });
    }
    
    const newBerita = new Berita({
      title,
      slug,
      author,
      category,
      content: typeof content === 'string' ? content.split('\n') : content,
      tags: typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags,
      date: new Date(),
      photo: req.file ? {
        url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
        context: title
      } : null
    });

    await newBerita.save();
    res.status(201).json(newBerita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params; // Menangkap 69fb23205c7e33a5a3aa71e8
        const updateData = { ...(req.body || {}) };
        
        // Jika ada file foto baru
        if (req.file) {
            updateData.photo = {
                url: req.file.path,
                context: req.body?.title || ''
            };
        }

        const updatedPost = await Berita.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedPost) {
            return res.status(404).json({ message: "Data tidak ditemukan di Database" });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};