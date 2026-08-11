import getCurrentUser from "@/utils/actions/getCurrentUser"

const Profile = async () => {
    const user = await getCurrentUser()

    return (
        <div>
            <h1>Профиль</h1>
            <p>Пользователь: {user?.id}</p>
            <p>Имя: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Создано: {user?.createdAt.getTime()}</p>
        </div>
    )
}

export default Profile