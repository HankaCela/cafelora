import { render } from '@czechitas/render';
// Import globálních a lokálních stylů
import '../global.css';
import './index.css';
import './order.css';

// Import komponent
import Header from '../components/Header';
import Footer from '../components/Footer';
import Order from '../components/Order';

const API_BASE = 'http://localhost:4000/api';

// Načteme data objednávek ze serveru - jen objednané nápoje s vybranými poli
const response = await fetch(`${API_BASE}/drinks?filter=ordered:eq:true&select=id,name,image`);
const data = await response.json();
const orderData = data.data;

// Vykreslíme stránku do elementu s id 'root'
document.querySelector('#root').innerHTML = render(
  <div className="page">
    {/* Hlavička stránky, bez menu */}
    <Header showMenu={false} />
    {/* Komponenta zobrazující objednané položky */}
    <Order items={orderData} />
    {/* Patička stránky */}
    <Footer />
  </div>
);
