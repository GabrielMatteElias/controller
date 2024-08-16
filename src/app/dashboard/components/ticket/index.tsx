import { FiFile, FiTrash } from "react-icons/fi";

export function TicketItem() {
    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">
                    Mercado Matte
                </td>
                <td className="text-left hidden sm:table-cell">
                    01/05/2017
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">Aberto</span>
                </td>
                <td className="text-left">
                    <button className="mr-2">
                        <FiTrash size={24} color="#ef4444" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82fc" />
                    </button>
                </td>
            </tr>
        </>

    )
}