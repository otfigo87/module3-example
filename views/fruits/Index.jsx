const React = require("react");

function Index({fruits}) {
    console.log(fruits)
  return (
    <div>
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>
      <h1>Fruits Index Page</h1>
      <ul>
        {fruits.map((fruit) => {
          return (
            <li key={fruit._id}>
              The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is {fruit.color}{" "}
              <br></br>
              {fruit.readyToEat
                ? `It is ready to eat`
                : `It is not ready to eat`}
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  ); 
}

module.exports = Index;
