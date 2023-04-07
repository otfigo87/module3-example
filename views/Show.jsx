const React = require("react");

function Show({ fruit }) {
  console.log(fruit);
  return (
    <div>
      <h1>Hello Show Page</h1>
      <p>
        The {fruit.name} is {fruit.color} {" "}
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </div>
  );
}

module.exports = Show;
