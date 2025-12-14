import prisma from "../config/prisma.js";

// GET /api/books
export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, search = "", sortBy = "createdAt", order = "asc" } = req.query;

  const skip = (page - 1) * limit;
  const take = parseInt(limit);

  try {
    const where = search
      ? { title: { contains: search, mode: "insensitive" } }
      : {};

    const total = await prisma.book.count({ where });
    const books = await prisma.book.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: order },
      include: { category: true },
    });

    res.json({
      success: true,
      message: "List books",
      data: books,
      pagination: {
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/books/:id
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/books
export const createBook = async (req, res) => {
  const { title, author, description, categoryId } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author, description, categoryId },
    });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/books/:id
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, categoryId } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, description, categoryId },
    });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
