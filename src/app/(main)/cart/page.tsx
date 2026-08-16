import getCurrentUser from "@/utils/actions/getCurrentUser";
import prisma from "@/utils/prisma";

const Cart = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Корзина</h1>
        <p className="text-lg text-gray-600 mt-1">Пользователь не авторизован</p>
      </div>
    );
  }

  // Calculate total price (simplified for demonstration)
  const totalPrice = user?.products.reduce(
    (acc, product) => acc + product.price, 0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Корзина</h1>
        <p className="text-lg text-gray-600 mt-1">Пользователь: {user?.email}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {user?.products.length > 0 ? (
          user?.products.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Цена: {product.price}</p>
                {/* Placeholder for image if available */}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                  Изменить кол-во
                </button>
                <p className="text-lg font-bold text-gray-800">{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 rounded-xl shadow-md border border-dashed flex justify-center items-center">
             <p className="text-xl text-gray-500">Ваша корзина пуста.</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4  text-black border-b pb-2">Итого</h2>
        <div className="flex justify-between py-2 border-b text-black">
            <span>Общая сумма:</span>
            <span className="font-medium">{totalPrice.toFixed(2)} руб.</span>
        </div>
        <button 
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition shadow-md"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;