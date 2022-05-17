function readData() {
    token = localStorage.getItem("token");
    fetch("http://localhost:3000/emps",
        {
            method: "GET",
            headers: { "authorization": "bearer " + token }
        })
        .then(response => { return response.json() })
        .then(data => {
            var deleteBtn="<button type='button' id='delete1' onclick='deleteTableData()'>DELETE</button>";
            var updateBtn="<button type='button' id='update1' onclick='updateTableData()'>UPDATE</button>";
            var table;
            table = '<table border="2" id="ttable"><tr><th id="id">_id</th><th>name</th><th>branch</th><th>salary</th><th>update</th><th>delete</th></tr>'
            for (var i = 0; i < data.length; i++)
                table += '<tr><td>' + data[i]._id + '</td><td>' + data[i].name + '</td><td>' + data[i].branch + '</td><td>' + data[i].salary+'</td><td>' + updateBtn+'</td><td>' + deleteBtn;
            table += '</table>'
            document.getElementById("result").innerHTML = table;


        })
        .catch(error => {
            console.log("error");
        })
}


function updateTableData()
{
    var rowidx;
    var table=document.getElementById("ttable");
    //console.log(table.rows.length);
    for(var i=0;i<table.rows.length;i++)
    {
        table.rows[i].cells[4].onclick=function(){
            rowidx=this.parentElement.rowIndex;
            //console.log("row idx : "+rowidx);
            var id = parseInt(table.rows[rowidx].cells[0].innerHTML);
            //console.log("column index : "+id);
            fetch("http://localhost:3000/updateemp/"+id,{method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify({"name":document.getElementById("name1").value})})
            console.log("Data updated successfully");
            result.innerHTML=result.innerHTML+'<br/>';
        }
    }

}

function deleteTableData() 
{
    var rowidx;
    var table=document.getElementById("ttable");
    //console.log(table.rows.length);
    for(var i=0;i<table.rows.length;i++)
    {
        table.rows[i].cells[5].onclick=function(){
            rowidx=this.parentElement.rowIndex;
            //console.log("row idx : "+rowidx);
            var id = parseInt(table.rows[rowidx].cells[0].innerHTML);
            //console.log("column index : "+id);
            fetch("http://localhost:3000/deleteemp/"+id,{method:"DELETE",headers:{'Content-Type':'application.json'},body:JSON.stringify({})})
            console.log("Data deleted successfully");
            result.innerHTML=result.innerHTML+'<br/>';
        }

    }
    

}



function deleteAllData() {
    token = localStorage.getItem("token");
    fetch("http://localhost:3000/emps",
        {
            method: "GET",
            headers: { "authorization": "bearer " + token }
        })
        .then(response => { return response.json() })
        .then(data => {
            for (var i = 0; i < data.length; i++)
            {
               // id=document.getElementById("id1").value;
                id=parseInt(data[i]._id);
                fetch("http://localhost:3000/deleteemp/"+id,{method:"DELETE",headers:{'Content-Type':'application.json'},body:JSON.stringify({})})
                alert("Data"+i+" deleted successfully");
            }
        })
        .catch(error => {
            console.log("error");
        })
    
}