const skills = [
  { name: 'HTML/CSS/JS', level: 'advanced', color: '#e34c26' },
  { name: 'Vue 3', level: 'advanced', color: 'green' },
  { name: 'Nuxt 3', level: 'advanced', color: 'green' },
  { name: 'TailwindCSS', level: 'intermediate', color: 'lightblue' },
  { name: 'React', level: 'beginner', color: 'lightblue' },
]

function App() {
  return (
    <div className="card">
      <Avatar />

      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  )
}

function Avatar() {
  return (
    <img
      src="https://avatars.githubusercontent.com/u/17332418?v=4"
      alt="avatar"
      className="avatar"
    />
  )
}

function Intro() {
  return (
    <div>
      <h1>Koen Castermans</h1>
      <p>
        Front-end web developer at Wisemen. Has experience across the full
        stack. In his free time he likes to work out, ride his bike and play
        video games.
      </p>
    </div>
  )
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map(skill => (
        <Skill {...skill} />
      ))}
    </ul>
  )
}

function Skill({ name, level, color }) {
  // const emojiByLevel = {
  //   beginner: '👶',
  //   intermediate: '👍',
  //   advanced: '💪',
  // }

  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{name}</span>
      {/* <span>{emojiByLevel[level]}</span> */}

      <span>
        {level === 'beginner' && '👶'}
        {level === 'intermediate' && '👍'}
        {level === 'advanced' && '💪'}
      </span>
    </li>
  )
}

export default App
