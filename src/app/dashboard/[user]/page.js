import UserDashboardFile from "@/UserDashboard/UserDashboardFile"

async function page({params}) {
    const param = await params
  return (
    <UserDashboardFile user={param.user} />
  )
}

export default page