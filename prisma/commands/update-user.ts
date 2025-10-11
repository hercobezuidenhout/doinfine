import { User } from "@prisma/client";
import prisma from "..";

export const updateUser = async ({ id, name, aboutMe }: Pick<User, 'id' | 'name' | 'aboutMe'>) =>
    await prisma.user.update({
        data: {
            name,
            aboutMe
        },
        where: {
            id
        }
    });