import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { id } = await request.json()

    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!findTicket) {
        return NextResponse.json({ error: "Failed update ticket" }, { status: 400 })
    }

    try {

        await prismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: "FECHADO"
            }
        })

        return NextResponse.json({ message: "Chamado atualizado com sucesso!" })
    } catch (err) {

    }


}

export async function POST(request: Request) {
    const { customerId, name, description } = await request.json()

    if (!customerId || !name || !description) {
        return NextResponse.json({ error: "Failed create new ticket!" }, { status: 400 })
    }

    try {

        await prismaClient.ticket.create({

            data: {
                name: name,
                description: description,
                status: "ABERTO",
                customerId: customerId
            }
        })

        return NextResponse.json({ message: "Chamado registrado com sucesso!" })
    } catch (err) {
        return NextResponse.json({ error: "Failed create new ticket!" }, { status: 400 })

    }

    return NextResponse.json({ message: "Cadastrado com sucesso!" })
}