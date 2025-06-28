// Načtení funkce render, která umožňuje zobrazovat JSX komponenty
import { render } from '@czechitas/render';

// Import globálního stylu pro celý web
import '../global.css';
// Import CSS stylu specifického pro tuto stránku
import './index.css';
// Import speciálního stylu pro stránku s objednávkou
import './order.css';

// Import jednotlivých komponent (hlavička, patička, objednávka)
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Order from '../components/Order/Order';

// Adresa našeho API backendu
const API_BASE = 'http://localhost:4000/api';

// Načteme data z API – pouze nápoje, které jsou objednané
// Filtrujeme podle vlastnosti ordered:true a vybíráme jen id, name a image
const response = await fetch(`${API_BASE}/drinks?filter=ordered:eq:true&select=id,name,image`);
const data = await response.json();     // převedeme odpověď na JSON
const orderData = data.data;            // vytáhneme samotná data (pole objednaných nápojů)

// Vykreslíme stránku do elementu s id="root"
document.querySelector('#root').innerHTML = render(
  <div className="page">
    <div className="page">
      {/* Komponenta Header – showMenu={false} znamená, že se nezobrazí hlavní menu */}
      <Header showMenu={false} />

      {/* Komponenta Order – zobrazí seznam objednaných nápojů */}
      <Order items={orderData} />

      {/* Patička stránky */}
      <Footer />
    </div>
  </div>
  );