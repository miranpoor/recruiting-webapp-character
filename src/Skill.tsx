import type { Attributes, Dispatcher } from "./types";
import { SKILL_LIST } from './consts';

interface SkillProps {
  name: string;
  value: number;
  attributes: Attributes;
  totalPoints: number;
  skills: Record<string, number>;
  setSkills: Dispatcher<Record<string, number>>;
}

function Skill(props: SkillProps) {
  const skill = SKILL_LIST.find(skill => skill.name === props.name);
  const attributeModifier = Math.floor((props.attributes[skill.attributeModifier] - 10) / 2);

  const calculateTotalSpent = () => {
    return Object.entries(props.skills).reduce((total, skill) => total + skill[1], 0);
  }

  const handleClick = (step: number) => {
    const totalSpent = calculateTotalSpent();
    if (totalSpent + step > props.totalPoints) {
      alert('You need more skill points! Upgrade intelligence to get more.');
      return;
    }

    props.setSkills((prev) => ({
      ...prev,
      [props.name]: prev[props.name] + step,
    }));
  }

  return (
    <div>
      {props.name}: {props.value} (Modifier: {skill.attributeModifier}): {attributeModifier} 
      <button onClick={() => handleClick(1)}>+</button>
      <button onClick={() => handleClick(-1)}>-</button> 
      total: {props.value + attributeModifier}
    </div>
  );
}

export default Skill;
