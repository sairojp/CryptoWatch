      
      
      const button = document.querySelector(".searchbutton")
      button.addEventListener('click', function (){
        let input = document.querySelector(".searchbar").value.toLowerCase();
        try {
          if(input){
          fetch(`http://localhost:3000/search?crypto=${encodeURIComponent(input)}`)
          .then((resp) => resp.json())
          .then(response => {
            console.log(response.data)
            document.getElementById("column1").textContent=response.data.name;
            document.getElementById("column2").textContent=response.data.price;
            document.getElementById("column3").textContent=response.data.market;
            document.getElementById("column4").textContent=response.data.change24h;
            document.getElementById("column6").textContent=response.data.code;

            const button = document.createElement("button");
            button.textContent = "Create watchlist";
            button.className = "button-class";

            button.addEventListener("click", ()=> {
            const form = document.getElementById("priceForm");
            form.style.display = "block";
          });

            document.getElementById("column5").appendChild(button);

          })
        }
        }
        catch (error){
          console.alert(error.error)
        }
      })





const priceForm = document.getElementById("priceForm");
if(priceForm){
  window.alert("good");
}
priceForm.addEventListener("submit", async function(event) {
  event.preventDefault()
  
  const minPrice = document.getElementById("min_price").value;
  const maxPrice = document.getElementById("max_price").value;

  if (minPrice === "" || maxPrice === "") {
    alert("Please enter both minimum and maximum prices.");
    return;
  }

  const minPriceNumber = parseFloat(minPrice);
  const maxPriceNumber = parseFloat(maxPrice);

  if (minPriceNumber >= maxPriceNumber) {
    alert("Minimum price must be less than maximum price.");
    return;
  }
  const code = getElementById("column6").TextContent;
  // Prepare the data to be sent in the POST request
  const formData = {
    code:code,
    min_price: minPriceNumber,
    max_price: maxPriceNumber
  };

  // Send the POST request using Fetch API
  fetch('http://localhost:3000/watchlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    window.alert(response.json())
  })
  .then(data => {
    // Handle the response from the server
    console.log('Response from server:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});
