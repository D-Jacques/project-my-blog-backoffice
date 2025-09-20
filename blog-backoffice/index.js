document.addEventListener("DOMContentLoaded",() => {
    let customRequest = new Request(
        "http://localhost:3001/home/",
        {
            method: "GET"
        }
    );

    fetch(customRequest)
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Une erreur est survenue', {cause: response});
            }
        })
        .then( data => {
            console.log(data);
        })
        .catch( error => {
            console.log("There is a error \n");
            console.log(error);
        });
});