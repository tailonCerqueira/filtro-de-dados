window.addEventListener('load', function(){   
    let URLRequest = "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";

    fetch(URLRequest).then(response => {        
        response.json().then(data => {
            show(data);       
        });
    });  

});
var newParam = [];
function show(data){    
    var data = data;
    // Get param to search
    let inputSearch = document.querySelector('#search');
    function search(){
        let param = document.querySelector('#search');
        let valParam = param.value;
        let arrayName = getNamesArray();       
        newParam.pop();
        newParam.push(valParam.toLocaleLowerCase());   

        console.log(arrayName);    
        console.log(newParam);                 
        console.log(getMatches(arrayName, newParam));

    }
    inputSearch.addEventListener('input', search);
    
    // Get name's arrays
    function getNamesArray(){
        var arrayName = [];
        //Loop to get all arrays elements name
        for (let index = 0; index < data['results'].length; index++) {    
            arrayName.push(data['results'][index]['name']['first'].toLocaleLowerCase())   
        }      
        return arrayName;
    }

    // get matches
    function getMatches(arrayName, newParam){
        let newName = [];
        for (let index = 0; index < arrayName.length; index++) {
            let newArrayName = arrayName[index];                       
            for (let j = 0; j < newArrayName.length; j++) {
                arrayName[j].toLocaleLowerCase();
                if (newArrayName[j] === newParam) {                
                    newName.push(arrayName[j]);                                               
                }
            }
        }        
        return(newName);
    } 
}



//Loop to get all arrays elements
function getNamesArrayFull(data){
    var arrayFull = [];

    for (let index = 0; index < data['results'].length; index++) {    
        arrayFull.push(data['results'][index]);        
    }

    return arrayFull;
}
//Field inputs with base in search
function setFields(data){ 

    //Title Name + LastName
    const userTitle = document.querySelector("#title");
    const userName = document.querySelector("#name");
    const userLastName = document.querySelector("#latName");

    userTitle.textContent = data['results'][0]['name']['title'];
    userName.textContent = data['results'][0]['name']['first'];
    userLastName.textContent = data['results'][0]['name']['last'];

    //Url Photo
    const userUrlPhoto = document.querySelector("#profilePhoto");
    userUrlPhoto.setAttribute('src', data['results'][0]['picture']['medium'])

    //Age
    const userAge = document.querySelector("#age");
    userAge.textContent = data['results'][0]['dob']['age'];

    //Gender
    const userGender = document.querySelector("#gender");
    userGender.textContent = data['results'][0]['gender'];
}