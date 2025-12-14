import prisma from "../config/prisma.js";

// GET /api/books
export const getBooks = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      search,
      sortBy = "id",
      order = "asc",
      categoryId
    } = req.query;

    page = parseInt(page);
    limit = Math.min(parseInt(limit), 50); // max 50

    const where = {};

    if (categoryId) {
      where.categoryId = Number(categoryId);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order }
      }),
      prisma.book.count({ where })
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      pagination: {
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    next(error);
  }
};


// GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST /api/books (ADMIN)
export const createBook = async (req, res) => {
  try {
    const { title, author, description, categoryId } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        categoryId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT /api/books/:id (ADMIN)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, categoryId } = req.body;

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        description,
        categoryId,
      },
    });

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE /api/books/:id (ADMIN)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
