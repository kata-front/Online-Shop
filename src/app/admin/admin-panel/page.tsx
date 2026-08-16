import CreateProductForm from "@/components/admins/createProduct";
import DeleteProductButton from "@/components/admins/deleteButton";
import prisma from "@/utils/prisma";

const AdminPanel = async () => {
    const allUsers = await prisma.user.findMany()
    const allProducts = await prisma.product.findMany()

    return (
        <div className="min-h-screen p-8 bg-[#0a192f] text-white font-mono">
            <header className="mb-10 border-b border-cyan-700 pb-4">
                <h1 className="text-4xl text-cyan-400 tracking-wider animate-pulse">
                    // КОНСОЛЬ АДМИНИСТРАТОРА v2.1
                </h1>
                <p className="text-sm text-gray-400 mt-1">Система управления данными. Подключение к ядру данных...</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Блок Пользователей */}
                <section className="lg:col-span-1 bg-[#112233] p-6 rounded-lg shadow-lg border border-cyan-800/50">
                    <h2 className="text-2xl text-cyan-300 mb-4 border-b border-cyan-700 pb-2">
                        [КОНСОЛЬ] УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
                    </h2>
                    <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
                        {allUsers.length > 0 ? (
                            allUsers.map((user) => (
                                <div key={user.id} className="p-2 bg-[#0a1623] rounded text-sm border-l-4 border-cyan-500 transition duration-150 hover:bg-[#08111e]">
                                    <span className="text-green-400 mr-2">•</span> {user.email}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Пользователи не обнаружены в системе.</p>
                        )}
                    </div>
                </section>

                {/* Блок Продуктов */}
                <section className="lg:col-span-2 bg-[#112233] p-6 rounded-lg shadow-lg border border-cyan-800/50">
                    <h2 className="text-2xl text-cyan-300 mb-4 border-b border-cyan-700 pb-2">
                        [СПЕКТР] КАТАЛОГ ПРОДУКТОВ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allProducts.length > 0 ? (
                            allProducts.map((product) => (
                                <div key={product.id} className="p-4 bg-[#1a283d] rounded-md border border-cyan-700/50 hover:border-cyan-500 transition duration-300 shadow-md">
                                    <h3 className="text-xl text-yellow-300">{product.name}</h3>
                                    <p className="text-sm text-gray-300 mt-1">{product.description || "Нет описания"}</p>
                                    <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between items-center">
                                        <span className="text-2xl text-green-400">{product.price.toFixed(2)} CR</span>
                                        <DeleteProductButton productId={product.id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic col-span-2">Продукты не обнаружены в базе данных. Создайте новый продукт.</p>
                        )}
                    </div>
                </section>
            </div>

            {/* Форма Создания Продукта (Отдельный блок) */}
            <div className="mt-12 p-8 bg-[#112233] rounded-lg shadow-2xl border border-cyan-700/70">
                <h2 className="text-3xl text-cyan-400 mb-6 border-b border-cyan-600 pb-2">
                    [ИНЖЕКЦИЯ] СОЗДАНИЕ НОВОГО ЭЛЕМЕНТА (Product)
                </h2>
                <CreateProductForm />
            </div>
        </div>
    );
};

export default AdminPanel;