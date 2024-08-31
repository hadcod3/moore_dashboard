import GearForm from "@/components/shared/GearForm"
import { getGearById } from "@/lib/actions/gear.actions"

type UpdateGearProps = {
    params: {
        id: string
    }
}

const UpdateGear = async ({ params: { id } }: UpdateGearProps) => {

  const gear = await getGearById(id)

    return (
        <>
            <section className="bg-primary-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Update Gear</h3>
            </section>

            <div className="wrapper my-8">
                <GearForm 
                type="Update" 
                gear={gear} 
                gearId={gear._id} 
                />
            </div>
        </>
    )
}

export default UpdateGear