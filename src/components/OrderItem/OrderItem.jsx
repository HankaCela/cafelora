import './OrderItem.css';

const SERVER_URL = 'http://localhost:4000';

export const OrderItem = ({name, image}) => {
  return (
    <div className="order-item">
      <img
        src={`${SERVER_URL}${image}`}
        className="order-item__image"
      />
      <div className="order-item__name">
        {name}
      </div>
    </div>
  );
};

export default OrderItem;