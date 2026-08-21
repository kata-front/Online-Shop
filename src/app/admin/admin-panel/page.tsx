import CreateProductForm from "@/components/admins/createProduct";
import DeleteProductButton from "@/components/admins/deleteButton";
import prisma from "@/utils/prisma";

const AdminPanel = async () => {
  const allUsers = await prisma.user.findMany();
  const allProducts = await prisma.product.findMany();

  // Статистика для карточек
  const stats = [
    {
      title: "Всего пользователей",
      value: allUsers.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4 4 4 0 004 4z" />
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Товаров в каталоге",
      value: allProducts.length,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Сумма",
      value: allProducts.length
        ? (allProducts.reduce((sum, p) => sum + p.price, 0)).toFixed(2) + " ₽"
        : "—",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Верхняя навигационная панель */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Панель администратора
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Управление пользователями и товарами</p>
          </div>
          <a
            href="#create-product"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Новый товар
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Блок статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition duration-200 hover:shadow-md"
            >
              <div className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${stat.gradient} text-white flex items-center justify-center shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Основная сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Пользователи */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4 4 4 0 004 4z" />
                  </svg>
                  Пользователи
                </h2>
                <p className="text-sm text-gray-500 mt-1">Всего: {allUsers.length}</p>
              </div>
              <div className="divide-y divide-gray-100 max-h-150 overflow-y-auto">
                {allUsers.length > 0 ? (
                  allUsers.map((user) => (
                    <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition duration-150 group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500 text-sm">
                    Пользователи не найдены
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Товары */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Каталог товаров
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Всего: {allProducts.length}</p>
                </div>
                <a
                  href="#create-product"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  + Добавить
                </a>
              </div>

              {allProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {allProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-gray-50 hover:bg-white rounded-xl border border-gray-200 hover:border-indigo-300 p-5 transition duration-200 hover:shadow-md flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </div>
                        <DeleteProductButton productId={product.id} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 flex-1">
                        {product.description || "Нет описания"}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-xl font-bold text-indigo-600">
                          {product.price.toFixed(2)} CR
                        </span>
                        <span className="text-xs text-gray-400">ID: {product.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-lg font-medium">Товары не найдены</p>
                  <p className="text-sm mt-1">Добавьте первый товар через форму ниже</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Форма создания товара */}
        <div id="create-product" className="mt-10 scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Создание нового товара
              </h2>
              <p className="text-sm text-gray-600 mt-1">Заполните информацию о товаре</p>
            </div>
            <div className="p-6">
              <CreateProductForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;