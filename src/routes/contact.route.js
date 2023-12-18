import { PrismaClient } from "@prisma/client";
import express from "express";
import { ContactController } from "../controller/contact.controller.js";
import { ContactService } from "../service/contact.service.js";
import { ContactRepository } from "../repository/contact.repository.js";

const router = express.Router();

const prisma = new PrismaClient();
const contactRepository = new ContactRepository(prisma);
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

router.get('/', async (req, res) => contactController.getBySearch(req, res));

router.post('/', async (req, res) => contactController.create(req, res));

router.patch('/:id', async (req, res) => contactController.update(req, res));

router.delete('/:id', async (req, res) => contactController.delete(req, res));

export default router;