import getCurrentUser from "@/utils/actions/getCurrentUser";
import prisma from "@/utils/prisma";

const Cart = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Корзина</h1>
      <p>Пользователь: {user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;