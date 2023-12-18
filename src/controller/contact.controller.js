import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ContactController {
    contactService;

    constructor(contactService) {
        this.contactService = contactService;
    }

    async getBySearch(req, res) {
        const search = String(req.query.search);

        if (!search) {
            return res.status(400).send({ message: "Not found parameters." });
        }

        const contact = await this.contactService.findBySearch(search);

        if (!contact) {
            return res.status(404).send({ message: "Contact not found." });
        }

        res.status(200).send({
            contact: {
                id: contact.id,
                name: contact.name,
                age: contact.age,
                phone: contact?.Phone?.number
            }
        });
    }

    async create(req, res) {
        const body = req.body;

        if (!body.contact || !body.phone) {
            return res.status(400).send({ message: "ValidationError." })
        }

        const contactExist = await this.contactService.exist(body);

        if (contactExist) {
            return res.status(400).send({ message: "Contact exists." })
        }

        const contact = await this.contactService.create(body);

        res.status(201).send({
            contact: {
                id: contact.id,
                name: contact.name,
                age: contact.age,
                phone: contact.Phone.number
            }
        });
    }

    async update(req, res) {
        const contactId = Number(req.params.id);

        const contact = await this.contactService.find(contactId);

        if (!contact) {
            return res.status(404).send({ message: "Contact not found." });
        }

        const body = req.body;

        const updatedContact = await this.contactService.update(body, contact);

        res.status(200).send({
            contact: {
                id: updatedContact.id,
                name: updatedContact.name,
                age: updatedContact.age,
                phone: updatedContact.Phone.number
            }
        })
    }

    async delete(req, res) {
        const contactId = Number(req.params.id);
        const contact = await this.contactService.find(contactId);

        if (!contact) {
            return res.status(404).send({ message: "Contact not found." });
        }

        const deletedTime = new Date().toISOString();

        await this.contactService.delete(deletedTime, contact);

        this.generateLog(contact, deletedTime);

        res.status(200).send();
    }

    generateLog(contact, deletedTime) {
        const file = `log-${Date.now()}-${contact.id}.txt`;
        const fileContent = {
            contactId: contact.id,
            deletedAt: deletedTime
        }

        fs.writeFile(path.resolve(__dirname, 'logs', file), JSON.stringify(fileContent), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }
}