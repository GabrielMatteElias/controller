import { Container } from "@/components/container/index"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";
import { ButtonRefresh } from "./components/button";


export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true,
        }
    })
    console.log(tickets);

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex gap-3 items-center">
                        <ButtonRefresh />
                        <Link href='/dashboard/new' className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamado
                        </Link>

                    </div>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1">CLIENTE</th>
                            <th className="font-medium text-left hidden sm:table-cell">DATA CADASTRO</th>
                            <th className="font-medium text-left">STATUS</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <TicketItem
                                key={ticket.id}
                                ticket={ticket}
                                customer={ticket.customer}
                            />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <h1 className="px-2 text-gray-600">Nenhum ticket aberto foi encontrado...</h1>
                )}
            </main>

        </Container>
    )
}