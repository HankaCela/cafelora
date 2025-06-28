// Načtení funkce render z balíčku @czechitas (slouží k zobrazení JSX komponent)
import { render } from '@czechitas/render';

// Import globálního CSS stylu (platí pro celý projekt)
import '../global.css';
// Import CSS stylu specifického pro tento soubor/stránku
import './index.css';

// Import jednotlivých React komponent
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import Menu from '../components/Menu/Menu';
import Gallery from '../components/Gallery/Gallery';
import Contact from '../components/Contact/Contact';

// Adresa API serveru, ze kterého získáváme data o nápojích
const API_BASE = 'http://localhost:4000/api';

// Načtení dat z API – konkrétně seznam nápojů
const response = await fetch(`${API_BASE}/drinks`);
const data = await response.json();         // převedeme odpověď na JSON
const drinksData = data.data;              // z dat vytáhneme pole nápojů

// Vykreslení celé stránky do elementu s id="root"
document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header />                    {/* Hlavička stránky */}
    <main>
      <Banner />                 {/* Úvodní banner */}
      <Menu drinks={drinksData}/> {/* Menu s nápoji – data předáváme přes prop drinks */}
      <Gallery />                {/* Fotogalerie */}
      <Contact />                {/* Kontakt */}
    </main>
    <Footer />                    {/* Patička stránky */}
  </div>
);

// 📱 Mobilní menu – přepínání zobrazení
const navToggle = document.querySelector('.nav-btn');        // tlačítko pro otevření/zavření menu
const mobileNav = document.querySelector('.rollout-nav');    // mobilní navigace

// Po kliknutí na tlačítko přepneme třídu, která otevírá/zavírá mobilní menu
navToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('nav-closed');
});

// Když někdo klikne na mobilní menu, automaticky ho zavřeme
mobileNav.addEventListener('click', () => {
  mobileNav.classList.add('nav-closed');
});

// 🧾 Obsluha formulářů pro objednání nápojů
const orderForms = document.querySelectorAll('.drink form'); // vybereme všechny formuláře u nápojů

orderForms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Zrušíme výchozí odeslání formuláře

    const drinkId = Number(e.target.dataset.id); // Získáme ID nápoje z atributu data-id

    // Najdeme konkrétní nápoj podle ID
    const drink = drinksData.find(drink => drink.id === drinkId);

    // Opačná hodnota než aktuální – true/false (objednat/zrušit)
    const orderValue = !drink.ordered;

    // Odeslání změny (objednávka nebo zrušení objednávky) na server pomocí PATCH
    const response = await fetch(`${API_BASE}/drinks/${drinkId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        op: 'replace',        // říkáme, že chceme nahradit hodnotu
        path: '/ordered',     // vlastnost, kterou měníme
        value: orderValue,    // nová hodnota (true nebo false)
      }]),
    });

    const data = await response.json();     // odpověď serveru
    console.log(data);                      // výpis do konzole

    // Obnovíme stránku, aby se zobrazil aktuální stav objednávky
    window.location.reload();
  });
});
