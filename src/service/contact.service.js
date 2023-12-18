export class ContactService {
    contactRepository;

    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    async create(body) {
        return this.contactRepository.create(body);
    }

    async find(contactId) {
        return this.contactRepository.find(contactId);
    }

    async findBySearch(search) {
        return this.contactRepository.findBySearch(search);
    }

    async exist(body) {
        return this.contactRepository.exist(body);
    }

    async update(body, contact) {
        return this.contactRepository.update(body, contact);
    }

    async delete(deletedTime, contact) {
        return this.contactRepository.delete(deletedTime, contact);
    }
}