function App() {
  return (
    <div className="card">
      <Avatar />

      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      src="https://avatars.githubusercontent.com/u/17332418?v=4"
      alt="avatar"
      className="avatar"
    />
  );
}

function Intro() {
  return (
    <div>
      <h1>Koen Castermans</h1>
      <p>
        Front-end web developer at Wisemen. Has experience across the full stack.
        In his free time he likes to work out, ride his bike and play video games.
      </p>
    </div>
  );
}

function SkillList() {
  return <ul className="skill-list">
    <Skill name="HTML/CSS/JS" emoji="💪" color="#e34c26" />
    <Skill name="Vue 3" emoji="💪" color="green" />
    <Skill name="Nuxt 3" emoji="💪" color="green" />
    <Skill name="TailwindCSS" emoji="💪" color="lightblue" />
    <Skill name="React" emoji="👍" color="lightblue" />
  </ul>
}

function Skill({name, emoji, color}) {
  return <li className="skill" style={{backgroundColor: color}}>
    <span>{name}</span>
    <span>{emoji}</span>
  </li>
}

export default App;
