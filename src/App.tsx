import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import type { Attributes  } from "./types";
import Attribute from './Attribute';
import Class from './Class';
import Skill from './Skill';

function App() {
  const [attributes, setAttributes] = useState<Attributes>(
    ATTRIBUTE_LIST.reduce((attribute, name) => {
      attribute[name] = 10;
      return attribute;
    }, {} as Attributes)
  );
  
  const [activeClass, setActiveClass] = useState('');

  const [skills, setSkills] = useState<Record<string, number>>(
    SKILL_LIST.reduce((skill, item) => {
      skill[item.name] = 0;
      return skill;
    }, {} as Record<string, number>)
  );

  const totalPoints = Math.max(10 + 4 * Math.floor((attributes['Intelligence'] - 10) / 2), 0);

  const saveData = () => {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{miranpoor}/character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attributes,
        skills
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200) {
          alert('Character saved successfully');
        }
        else {
          alert('Error saving character');
        }
        console.log(data);
      })
      .catch((error) => {
          console.log(error);
      });
  }

  useEffect(() => {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{miranpoor}/character', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.body.attributes) {          
          setAttributes(data.body.attributes);
        }

        if (data.body.skills) {
          setSkills(data.body.skills);
        }
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <div className='save-button'>
        <button onClick={saveData}>Save Character</button>
      </div>

      <section className="App-section">
        <div className="column">
          <h2>Attributes</h2>
          {Object.entries(attributes).map((attribute, index) => (
            <Attribute
              key={index}
              name={attribute[0]}
              value={attribute[1]}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          ))}
        </div>

        <div className="column">
          <h2>Classes</h2>
          {Object.keys(CLASS_LIST).map((className, index) => (
            <Class
              key={index}
              name={className}
              attributes={attributes}
              setActiveClass={setActiveClass}
            />
          ))}
        </div>

        {activeClass && (
          <div className="column">
            <h2>{activeClass} Minimum Requirements</h2>
            {Object.entries(CLASS_LIST[activeClass]).map((attribute, index) => (
              <div key={index}>
                {attribute[0]}: {attribute[1] as string}
              </div>
            ))}
            <button onClick={() => setActiveClass('')}>Close Requirement View</button>
          </div>
        )}

        <div className="column">
          <h2>Skills</h2>
          <div>Total skill points available: {totalPoints}</div><br/>
          {Object.entries(skills).map((skill, index) => (
            <Skill
              key={index}
              name={skill[0]}
              value={skill[1]}
              attributes={attributes}
              totalPoints={totalPoints}
              skills={skills}
              setSkills={setSkills}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
