import prisma from "..";

interface CreateUserCommand {
    id: string;
    name?: string;
    email: string;
}

export const createUser = async ({ id, name, email }: CreateUserCommand) =>
    await prisma.user.create({
        data: {
            id,
            name: name || "Doinfiner",
            email
        }
    });