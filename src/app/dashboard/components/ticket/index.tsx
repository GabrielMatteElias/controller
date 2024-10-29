"use client"

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.types";
import { TicketProps } from "@/utils/ticket.types";
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiFile, FiTrash } from "react-icons/fi";

import { ModalContext } from '@/providers/modal'
import { useContext } from "react";


interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
    const router = useRouter()

    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

    async function handleChangeStatus() {
        try {
            await api.patch("/api/ticket", {
                id: ticket.id
            })
            router.refresh()
        } catch (err) {
            console.log(err);
        }
    }

    function handleOpenModal() {
        handleModalVisible()
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">
                    {customer?.name}
                </td>
                <td className="text-left hidden sm:table-cell">
                    {ticket.created_at.toLocaleDateString('pt-br')}
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">
                        {ticket.status}

                    </span>
                </td>
                <td className="text-left">
                    <button className="mr-3">
                        <FiCheckSquare size={24} color="#131313" onClick={handleChangeStatus} />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82fc" onClick={handleOpenModal} />
                    </button>
                </td>
            </tr>
        </>
    )
}