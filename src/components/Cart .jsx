import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { selectCartItems, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Calculate the total quantity of items in the cart
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-container p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-orange-600">
        Your Cart ({getTotalQuantity()})
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="cart-item flex justify-between items-center py-2 border-b"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>
                  {item.quantity}x @ ${item.price.toFixed(2)}{' '}
                  <span className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              <AiOutlineClose
                className="cursor-pointer text-red-600"
                onClick={() => handleRemoveItem(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="pt-4 border-t">
        <p className="text-lg font-bold">
          Order Total <span className="text-2xl">${getTotalPrice()}</span>
        </p>
      </div>
      <div className="bg-gray-100 p-3 rounded-md text-center text-sm text-gray-600">
        <p>
          This is a <span className="text-green-500">carbon-neutral</span>{' '}
          delivery
        </p>
      </div>
      <button className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold">
        Confirm Order
      </button>
    </div>
  );
};

export default Cart;
