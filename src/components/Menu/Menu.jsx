// Importuje se CSS soubor pro stylování komponenty Menu
import './Menu.css';

// Importuje se komponenta Drink, která reprezentuje jednotlivý nápoj
import Drink from '../Drink/Drink';

// Adresa serveru, odkud se budou načítat obrázky nápojů
const SERVER_URL = 'http://localhost:4000';

// Hlavní komponenta Menu, která přijímá prop "drinks" (pole nápojů)
export const Menu = ({drinks}) => {
  return (
    // Sekce nabídky
    <section className="menu" id="menu">
      <div className="container">
        {/* Nadpis sekce */}
        <h2>Naše nabídka</h2>

        {/* Úvodní text pod nadpisem */}
        <p className="menu-intro">
          Vyberte si z našeho interaktivního menu a nemusíte čekat na obsluhu
        </p>

        {/* Seznam nápojů - každý se vykreslí pomocí komponenty Drink */}
        <div className="drinks-list">
          {drinks.map(drink =>
            <Drink
              key={drink.id} // Unikátní klíč pro React, důležitý pro vykreslování
              id={drink.id} // ID nápoje
              name={drink.name} // Název nápoje
              ordered={drink.ordered} // Informace, zda je nápoj objednaný
              image={`${SERVER_URL}${drink.image}`} // Celá URL k obrázku nápoje
              layers={drink.layers} // Informace o vrstvách nápoje (např. káva, mléko)
            />
          )}
        </div>

        {/* Odkaz na detail objednávky */}
        <div className="order-detail">
          <a href="/order.html">Detail objednávky</a>
        </div>
      </div>
    </section>
  );
}

// Výchozí export komponenty
export default Menu;