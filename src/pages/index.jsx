import { render } from '@czechitas/render';  // Funkce pro vykreslení JSX do HTML stringu
import '../global.css';  // Globální styly
import './index.css';    // Specifické styly pro tuto stránku

// Import jednotlivých komponent, které tvoří stránku
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

// Základní URL pro API požadavky
const API_BASE = 'http://localhost:4000/api';

// IIFE - okamžitě spuštěná asynchronní funkce
(async () => {
  // Zavolání API pro získání dat o drincích
  const response = await fetch(`${API_BASE}/drinks`);
  const data = await response.json();
  const drinksData = data.data;  // Pole drinků

  // Vykreslení celé stránky do elementu s id="root"
  document.querySelector('#root').innerHTML = render(
    <div className="page">
      <Header />
      <main>
        <Banner />
        {/* Předání dat drinků do komponenty Menu */}
        <Menu drinks={drinksData} />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );

  // Nastavení chování pro mobilní menu
  setupMenuToggle();

  // Nastavení obsluhy formulářů pro objednávání drinků
  setupOrderForms(drinksData);
})();

// Funkce pro ovládání mobilního menu
const setupMenuToggle = () => {
  const navToggle = document.querySelector('.nav-btn');        // Tlačítko pro otevření/zavření menu
  const mobileNav = document.querySelector('.rollout-nav');    // Mobilní navigace

  // Při kliknutí na tlačítko se menu přepne mezi zavřeným a otevřeným stavem
  navToggle?.addEventListener('click', () => {
    mobileNav?.classList.toggle('nav-closed');
  });

  // Při kliknutí kamkoliv do mobilního menu se menu zavře
  mobileNav?.addEventListener('click', () => {
    mobileNav?.classList.add('nav-closed');
  });
};

// Funkce pro obsluhu odesílání objednávek drinků
const setupOrderForms = (drinksData) => {
  // Vyhledání všech formulářů v každém drinku
  const orderForms = document.querySelectorAll('.drink form');

  orderForms.forEach((form) => {
    // Přidání event listeneru pro odeslání formuláře
    form.addEventListener('submit', async (e) => {
      e.preventDefault();  // Zabránění standardnímu odeslání formuláře a reloadu stránky
      const drinkId = Number(e.target.dataset.id);  // Získání ID drinku z atributu data-id formuláře

      // Najdeme v datech odpovídající drink podle ID
      const drink = drinksData.find((d) => d.id === drinkId);

      // Přepnutí hodnoty objednávky (objednat/zrušit objednávku)
      const orderValue = !drink.ordered;

      // Poslání PATCH požadavku na server, který změní stav objednávky drinku
      await fetch(`${API_BASE}/drinks/${drinkId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            op: 'replace',
            path: '/ordered',
            value: orderValue,
          },
        ]),
      });

      // Po úspěšném updatu stránky reloadneme, aby se zobrazil nový stav objednávky
      window.location.reload();
    });
  });
};