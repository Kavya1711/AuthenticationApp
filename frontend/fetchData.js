function login() {
    user = document.getElementById("username1").value;
    pass = document.getElementById("password1").value;
    fetch("http://localhost:3000/login", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "username": user, "password": pass }) })
        .then(response => {
            return response.json();
        })
        .then(data => localStorage.setItem('token', data.token));
}

function validate()
{
    const user = document.getElementById("username1").value;
    const pass = document.getElementById("password1").value;
    fetch("http://localhost:3000/login", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "username": user, "password": pass }) })

    .then(response => {
            return response.json();
        })
        .then((data) =>{
            if(data.success==true)
            {
                return true;
            }
            else
            {
                document.write("<h2>Oops!! Not a authorized user</h2>");
                return false;
            }
            //return data.success;
        } );
}


// function validate()
// {
//     user = document.getElementById("username1").value;
//     pass = document.getElementById("password1").value;
//     fetch("http://localhost:3000/users", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ "username": user, "password": pass }) })
//     .then(response => {
//         return response.json();
//     })    
//     .then((data)=>{
//         console.log(data);
//         if(data.success==true)
//         {
//             //localStorage.setItem(data.token);
//             console.log(data.token);
//             return true;
//         }
//         else
//         {
//             alert("Oops!! Not a authorized user");
//             return false;
//         }
//     })
// }
