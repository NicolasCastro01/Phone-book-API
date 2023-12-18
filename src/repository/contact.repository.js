export class ContactRepository {
    prisma;

    constructor(prisma) {
        this.prisma = prisma;
    }

    async create(body) {
        const contact = await this.prisma.contact.create({
            data: {
                name: body.contact.name,
                age: body.contact.age,
                Phone: {
                    create: {
                        number: body.phone.number
                    }
                }
            },
            include: {
                Phone: true
            }
        });

        return contact;
    }

    async find(contactId) {
        const contact = await this.prisma.contact.findUnique({
            where: {
                id: contactId,
                AND: [
                    { deletedAt: null }
                ]
            },
            include: {
                Phone: true
            }
        });

        return contact;
    }

    async findBySearch(search) {
        const contact = await this.prisma.contact.findFirst({
            where: {
                OR: [
                    { name: search },
                    { Phone: { number: search } }
                ],
                AND: [
                    { deletedAt: null }
                ]
            },
            include: {
                Phone: true
            }
        });

        return contact;
    }

    async exist(body) {
        const contactExist = await this.prisma.contact.findFirst({
            where: {
                OR: [
                    { name: body?.contact?.name },
                    { Phone: { number: body?.phone?.number } }
                ],
                AND: [
                    { deletedAt: null }
                ]
            },
            include: {
                Phone: true
            }
        });
        return contactExist;
    }

    async update(body, contact) {
        const contactUpdated = await this.prisma.contact.update({
            data: {
                name: body?.contact?.name || contact.name,
                age: body?.contact?.age || contact.age,
                Phone: { update: { number: body?.phone?.number || contact.Phone.number } }
            },
            where: {
                id: contact.id
            },
            include: {
                Phone: true
            }
        });

        return contactUpdated;
    }

    async delete(deletedTime, contact) {
        await this.prisma.contact.update({
            data: {
                deletedAt: deletedTime,
                Phone: {
                    update: {
                        deletedAt: deletedTime
                    }
                }
            },
            where: {
                id: contact.id
            }
        });
    }
}