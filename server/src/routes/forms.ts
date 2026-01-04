import { Router } from "express";
import { db } from "../db";
import { forms } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "../lib/auth";
import { CreateFormSchema } from "../schemas/form";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Middleware to check authentication
const authenticate = async (req: any, res: any, next: any) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = session.user;
  next();
};

router.use(authenticate);

// List forms
router.get("/", async (req: any, res) => {
  try {
    const userForms = await db
      .select()
      .from(forms)
      .where(eq(forms.userId, req.user.id));
    res.json(userForms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch forms" });
  }
});

// Create form
router.post("/", async (req: any, res) => {
  try {
    const validatedData = CreateFormSchema.parse(req.body);
    const newForm = {
      id: uuidv4(),
      userId: req.user.id,
      title: validatedData.title,
      description: validatedData.description || "",
      formJson: validatedData.formJson,
      isMultiStep: validatedData.isMultiStep,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(forms).values(newForm);
    res.status(201).json(newForm);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get form by ID
router.get("/:id", async (req: any, res) => {
  try {
    const form = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, req.params.id), eq(forms.userId, req.user.id)))
      .limit(1);

    if (form.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch form" });
  }
});

// Update form
router.put("/:id", async (req: any, res) => {
  try {
    const validatedData = CreateFormSchema.partial().parse(req.body);
    
    const updateData: any = {
      ...validatedData,
      updatedAt: new Date(),
    };

    await db
      .update(forms)
      .set(updateData)
      .where(and(eq(forms.id, req.params.id), eq(forms.userId, req.user.id)));

    res.json({ message: "Form updated successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete form
router.delete("/:id", async (req: any, res) => {
  try {
    await db
      .delete(forms)
      .where(and(eq(forms.id, req.params.id), eq(forms.userId, req.user.id)));

    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete form" });
  }
});

export default router;
