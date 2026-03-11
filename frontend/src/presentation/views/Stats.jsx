import Counter from "./Counter";

export default function Stats() {
  return (
    <div className="stats">
      <div>
        <Counter value={6} />
        <p>MONTHS</p>
      </div>

      <div>
        <Counter value={2} />
        <p>MOONS</p>
      </div>

      <div>
        <Counter value={14} />
        <p>SATELLITES</p>
      </div>
    </div>
  );
}
