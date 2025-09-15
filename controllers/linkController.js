import mongoose from 'mongoose';
import Link from '../models/Link.js';

export async function listLinks(req, res) {
  const { tag, search } = req.query;
  const userId = req.user.id;

  const filter = { userId };
  if (tag) filter.tags = tag;
  if (search) filter.$text = { $search: search };

  const links = await Link.find(filter).sort({ createdAt: -1 }).lean();
  return res.json(
    links.map(l => ({
      id: l._id,
      url: l.url,
      title: l.title,
      description: l.description,
      tags: l.tags,
      createdAt: l.createdAt
    }))
  );
}

export async function createLink(req, res) {
  const { url, title, description = '', tags = [] } = req.body;
  if (!url || !title) {
    return res.status(400).json({ error: 'url and title are required' });
  }
  const link = await Link.create({ userId: req.user.id, url, title, description, tags });
  return res.status(201).json({
    id: link._id,
    url: link.url,
    title: link.title,
    description: link.description,
    tags: link.tags,
    createdAt: link.createdAt
  });
}

export async function updateLink(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid link id' });
  }
  const { title, description, tags } = req.body;

  const update = {};
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (tags !== undefined) update.tags = tags;

  const link = await Link.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { $set: update },
    { new: true }
  );
  if (!link) return res.status(404).json({ error: 'Link not found' });
  return res.json({
    id: link._id,
    url: link.url,
    title: link.title,
    description: link.description,
    tags: link.tags,
    createdAt: link.createdAt
  });
}

export async function deleteLink(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid link id' });
  }
  const result = await Link.deleteOne({ _id: id, userId: req.user.id });
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Link not found' });
  return res.status(204).send();
}


