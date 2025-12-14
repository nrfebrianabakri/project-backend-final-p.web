import prisma from "../config/prisma.js";

// GET /api/loans
export const getLoans = async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({ include: { user: true, book: true } });
    res.json({ success: true, data: loans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/loans/:id
export const getLoanById = async (req, res) => {
  const { id } = req.params;
  const user = req.user; 

  try {
    const loan = await prisma.loan.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, book: true },
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    //  CEK KEPEMILIKAN
    if (user.role === "USER" && loan.userId !== user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this loan",
      });
    }

    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// POST /api/loans
export const createLoan = async (req, res) => {
  const userId = req.user.id; 
  const { bookId } = req.body;

  try {
    const loan = await prisma.loan.create({
      data: { userId, bookId },
    });

    res.status(201).json({ success: true, data: loan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/loans/:id
export const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { userId, bookId } = req.body;
  try {
    const loan = await prisma.loan.update({ where: { id: parseInt(id) }, data: { userId, bookId } });
    res.json({ success: true, data: loan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/loans/:id
export const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.loan.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/loans/me
export const getMyLoans = async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      where: { userId: req.user.id },
      include: { book: true },
    });

    res.json({ success: true, data: loans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

