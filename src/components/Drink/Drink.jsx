// Importuje se CSS pro stylování komponenty Drink
import './Drink.css';

// Importuje se komponenta Layer, která vykresluje jednotlivou vrstvu nápoje (např. espresso, mléko)
import Layer from '../Layer/Layer';

// Komponenta Drink, která zobrazuje jeden nápoj
// Přijímá props: id (identifikátor nápoje), name (název), ordered (zda je objednaný), image (obrázek), layers (vrstvy)
export const Drink = ({id, name, ordered, image, layers}) => {
  return (
    <div className="drink">
      {/* Část s vizuálním zobrazením nápoje */}
      <div className="drink__product">
        {/* Hrníček s obrázkem */}
        <div className="drink__cup">
          <img src={image} />
        </div>

        {/* Informace o nápoji - název a jeho vrstvy */}
        <div className="drink__info">
          <h3>{name}</h3>

          {/* Pro každou vrstvu se vykreslí komponenta Layer */}
          {layers.map(layer =>
            <Layer
              key={layer.label} // Každá vrstva má unikátní klíč podle názvu
              color={layer.color} // Barva vrstvy (např. hnědá, bílá)
              label={layer.label} // Popis vrstvy (např. espresso, mléko)
            />
          )}
        </div>
      </div>

      {/* Formulář pro objednání nebo zrušení objednávky */}
      <form className="drink__controls" data-id={id}>
        {/* Skrytý input s výchozí hodnotou objednávky */}
        <input type="hidden" className="order-id" value="0" />

        {/* Tlačítko pro objednání nebo zrušení */}
        <button className={`order-btn ${ordered ? 'order-btn--ordered' : ''}`}>
          {ordered ? 'Zrušit' : 'Objednat'}
        </button>
      </form>
    </div>
  );
}

// Výchozí export komponenty
export default Drink;