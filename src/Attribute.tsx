import type { Attributes, Dispatcher } from "./types";

interface AttributeProps {
  name: string;
  value: number;
  attributes: Attributes;
  setAttributes: Dispatcher<Attributes>;
}

function Attribute(props: AttributeProps) {
  const calculateTotal = () => {
    return Object.entries(props.attributes).reduce((total, attribute) => total + attribute[1], 0);
  }

  const handleClick = (step: number) => {
    const total = calculateTotal();
    if (total + step > 70) {
      alert('A Character can have up to 70 Delegated Attribute Points.');
      return;
    }

    props.setAttributes((prev) => ({
      ...prev,
      [props.name]: prev[props.name] + step,
    }));
  }

  return (
    <div>
      {props.name}: {props.value} (Modifier: {Math.floor((props.value - 10) / 2)}) 
      <button onClick={() => handleClick(1)}>+</button>
      <button onClick={() => handleClick(-1)}>-</button>
    </div>
  );
}

export default Attribute;
