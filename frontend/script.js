// const { response } = require("express");
// const { join } = require("path");

function fetchData() {
    document.write("<b> ID    Name     Branch     Salary<b>");
    fetch("http://localhost:3000/emps")
        .then((response) => {
            return response.json()
        })
        
        .then(data => data.forEach(ele => {
            document.write(ele._id+" ");
            document.write(ele.name+" ");
            document.write(ele.branch+" ");
            document.write(ele.salary + "<br>");
        }))
    console.log("Data fetched successfully!!");
}

function addData() {
    const emp={
        "_id" :parseInt(document.getElementById("id1").value),
        "name":document.getElementById("name1").value,
        "branch":document.getElementById("branch1").value,
        "salary":parseInt(document.getElementById("salary1").value)
    }

    fetch("http://localhost:3000/addemp",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(emp)})
    console.log("Data added successfully");
}


function updateData() 
{
    id=document.getElementById("id1").value;
    fetch("http://localhost:3000/updateemp/"+id,{method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify({"name":document.getElementById("name1").value})})
    console.log("Data updated successfully");
}


function deleteData() {
    id=document.getElementById("id1").value;
    fetch("http://localhost:3000/deleteemp/"+id,{method:"DELETE",headers:{'Content-Type':'application.json'},body:JSON.stringify({})})
    console.log("Data deleted successfully");
}
