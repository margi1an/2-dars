import { useState, useEffect } from 'react';
import waffleThumbnail from '../assets/image-waffle-thumbnail.jpg';
import cremeBruleeThumbnail from '../assets/image-creme-brulee-thumbnail.jpg';
import macaronThumbnail from '../assets/image-macaron-thumbnail.jpg';
import tiramisuThumbnail from '../assets/image-tiramisu-thumbnail.jpg';
import baklavaThumbnail from '../assets/image-baklava-thumbnail.jpg';
import meringueThumbnail from '../assets/image-meringue-thumbnail.jpg';
import cakeThumbnail from '../assets/image-cake-thumbnail.jpg';
import brownieThumbnail from '../assets/image-brownie-thumbnail.jpg';
import pannaCottaThumbnail from '../assets/image-panna-cotta-thumbnail.jpg';
import { SlBasket } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './DessertList.css';
import Cart from '../components/Cart ';

const images = {
  'image-waffle-thumbnail.jpg': waffleThumbnail,
  'image-creme-brulee-thumbnail.jpg': cremeBruleeThumbnail,
  'image-macaron-thumbnail.jpg': macaronThumbnail,
  'image-tiramisu-thumbnail.jpg': tiramisuThumbnail,
  'image-baklava-thumbnail.jpg': baklavaThumbnail,
  'image-meringue-thumbnail.jpg': meringueThumbnail,
  'image-cake-thumbnail.jpg': cakeThumbnail,
  'image-brownie-thumbnail.jpg': brownieThumbnail,
  'image-panna-cotta-thumbnail.jpg': pannaCottaThumbnail,
};

const DessertList = () => {
  const [desserts, setDesserts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      'https://online-json-server-api.up.railway.app/project/66a0e8d21d2cd3eb11443570/desserts'
    )
      .then((response) => response.json())
      .then((data) => setDesserts(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAdd = (dessert) => {
    // Add to cart with a quantity of 1
    dispatch(addToCart({ ...dessert, quantity: 1 }));
  };

  return (
    <div className="flex container mx-auto">
      <div className="flex justify-between mx-auto w-full">
        <div className="w-full md:w-3/4 pl-3">
          <h1 className="text-4xl font-bold text-brown-900 mb-8">Desserts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {desserts &&
              desserts.length > 0 &&
              desserts.map((dessert, index) => (
                <div
                  key={index}
                  className="card bg-transparent flex flex-col items-center"
                >
                  <figure className="w-full flex justify-center">
                    <img
                      src={images[dessert.image.thumbnail.split('/').pop()]}
                      alt={dessert.name}
                      className="image rounded-xl w-full h-48 object-cover"
                    />
                  </figure>
                  <button
                    onClick={() => handleAdd(dessert)}
                    className="btn btn-outline btn-error gap-2 items-center flex mt-[-20px]"
                  >
                    <SlBasket className="text-[#C73B0F]" />
                    Add to Cart
                  </button>
                  <div className="desc">
                    <p className="categoriya text-gray-600 dark:text-gray-300 mb-2">
                      {dessert.category}
                    </p>
                    <h2 className="mb-2 name">{dessert.name}</h2>
                    <p className="text-red-500 font-semibold text-lg mb-4">
                      ${dessert.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="fixed ">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default DessertList;
