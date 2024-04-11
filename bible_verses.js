const options = { method: "GET", headers: { accept: "application/json" } };

fetch("https://beta.ourmanna.com/api/v1/get?format=json&order=daily", options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const verse = data.verse.details.text;
    const ref = data.verse.details.reference;
    const ver = data.verse.details.version;

    // Inserting verse into <p> element with id "Test"
    const testElement = document.getElementById("test");
    testElement.innerText = verse + " - " + ref + " (" + ver + ")";
  })
  .catch((err) => console.error(err));
