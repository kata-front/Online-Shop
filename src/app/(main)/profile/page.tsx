import getCurrentUser from "@/utils/actions/getCurrentUser";

const Profile = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Верхняя навигация */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Назад"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
          </div>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
            ID: {user.id}
          </span>
        </div>

        {/* Карточка профиля */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Шапка карточки */}
          <div className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">
                {initials}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-indigo-100">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm font-medium text-gray-500">Имя</dt>
              <dd className="text-sm font-semibold text-gray-900">{user.name}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm font-semibold text-gray-900">{user.email}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm font-medium text-gray-500">Дата регистрации</dt>
              <dd className="text-sm font-semibold text-gray-900">
                {new Date(user.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;