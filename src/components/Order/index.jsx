import './index.css';
import OrderItem from '../OrderItem';

export const Order = ({items}) => {
  return (
    <main className="order">
      <div className="container order__content">
        <h1>Vaše objednávka</h1>
        {items.length === 0 ? (
          <p className="empty-order">Zatím nemáte nic objednáno</p>
        ) : (
        <div className="order__items">
          {items.map(item =>
            <OrderItem
              key={item.id}
              name={item.name}
              image={item.image}
            />
          )}
        </div>
        )}
      </div>
    </main>
  );
};

export default Order;
