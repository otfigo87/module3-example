const React = require("react");
const DefaultLayout = require("../layout/Default");

function Show({ fruit }) {
  console.log(fruit);
  return (
    <DefaultLayout title="Show Fruit Page">
      <nav>
        <a href="/fruits">Home</a>
      </nav>
      <p>
        The {fruit.name} is {fruit.color}{" "}
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </p>
    </DefaultLayout>
  );
}

module.exports = Show;
