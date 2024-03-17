import CreateUser from '../features/user/CreateUser'

function Home() {
  return (
    <div className='home'>
      <h1 className="landing-title">
        The best pizza.
        <br />
        <span className="landing-title__highlight">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
