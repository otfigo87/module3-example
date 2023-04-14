const React = require("react");
const DefaultLayout = require("../layout/Default");

function Index({ fruits }) {
  console.log(fruits);
  return (
    <DefaultLayout title="Fruits Page">
      <nav>
        <a href="/fruits/new">Create a New Fruit</a>
      </nav>
      <h1>Fruits Index Page</h1>
      <ul>
        {fruits.map((fruit) => {
          return (
            <li key={fruit._id}>
              The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
              {fruit.color} <br></br>
              {fruit.readyToEat
                ? `It is ready to eat`
                : `It is not ready to eat`}
              <br />
              <button>
                <a href={`/fruits/${fruit._id}/edit`}>EDIT</a>
              </button>
              <form
                method="POST"
                action={`/fruits/${fruit._id}?_method=DELETE`}
              >
                <input type="submit" value="DELETE" />
              </form>
            </li>
          );
        })}
      </ul>

    </DefaultLayout>
  );
}

module.exports = Index;
