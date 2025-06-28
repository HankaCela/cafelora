// Importuje se CSS pro stylování vrstvy nápoje
import './Layer.css';

// Komponenta Layer, která zobrazuje jednu vizuální vrstvu nápoje
// Přijímá props: color (barva vrstvy) a label (popisek vrstvy)
export const Layer = ({color, label}) => {
  return (
    <div className="layer">
      {/* Barevný pruh reprezentující vrstvu nápoje */}
      <div
        className="layer__color"
        style={{ backgroundColor: color }} // Inline styl - nastaví barvu pozadí podle prop `color`
      ></div>

      {/* Popis vrstvy - například "mléko" nebo "espresso" */}
      <div className="layer__label">{label}</div>
    </div>
  );
}

// Výchozí export komponenty, aby ji bylo možné používat jinde
export default Layer;