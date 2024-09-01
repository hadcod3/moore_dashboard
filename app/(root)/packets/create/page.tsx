import PacketForm from "@/components/shared/PacketForm"
// import { auth } from "@clerk/nextjs"

const CreatePacket = () => {
 
    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Create Packets
                </h3>
            </section>

            <div className="wrapper my-8">
                <PacketForm  type="Create"/>
            </div>
        </>
    )
}

export default CreatePacket
