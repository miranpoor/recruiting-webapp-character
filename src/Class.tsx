import type { Attributes, Dispatcher } from "./types";
import { CLASS_LIST } from './consts';
import './Class.css';

interface ClassProps {
  name: string;
  attributes: Attributes;
  setActiveClass: Dispatcher<string>;
}

function Class(props: ClassProps) {

  const isEligible: boolean = props.attributes.Strength >= CLASS_LIST[props.name].Strength &&
    props.attributes.Dexterity >= CLASS_LIST[props.name].Dexterity &&
    props.attributes.Constitution >= CLASS_LIST[props.name].Constitution &&
    props.attributes.Intelligence >= CLASS_LIST[props.name].Intelligence &&
    props.attributes.Wisdom >= CLASS_LIST[props.name].Wisdom &&
    props.attributes.Charisma >= CLASS_LIST[props.name].Charisma;

  return (
    <div className={isEligible ? 'eligible' : ''} onClick={() => props.setActiveClass(props.name)}>
      <span className="pointer">{props.name}</span>
    </div>
  );
}

export default Class;
