function refreshTable(position) {
    var newTable = document.createElement("TABLE");
    setHeader(position, newTable);
    clearStatTable();
    setTableStyle(newTable);
    document.getElementById('statDiv').appendChild(newTable);
    getTableData(position);
}

function setHeader(position, table) {
    var tHead = table.createTHead();
    var header = tHead.insertRow(0);
    switch(position) {
        case 'QB':
            header.insertCell(0).innerHTML = 'Name';
            header.insertCell(1).innerHTML = 'Team';
            header.insertCell(2).innerHTML = 'Passing Yards';
            header.insertCell(3).innerHTML = 'Passing Touchdowns';
            header.insertCell(4).innerHTML = 'Passing Attempts';
            header.insertCell(5).innerHTML = 'Passing Completions';
            header.insertCell(6).innerHTML = 'Interceptions';
            break;
        default:
            header.insertCell(0).innerHTML = 'Name';
            header.insertCell(1).innerHTML = 'Team';
            header.insertCell(2).innerHTML = 'Rushing Yards';
            header.insertCell(3).innerHTML = 'Rushing Touchdowns';
            header.insertCell(4).innerHTML = 'Rushing Attempts';
            header.insertCell(5).innerHTML = 'Receiving Yards';
            header.insertCell(6).innerHTML = 'Receiving Touchdowns';
            header.insertCell(7).innerHTML = 'Receiving Receptions';
}

function setTableStyle(table) {
    table.setAttribute('class', 'stat-table');
    table.setAttribute('id', 'statTable');
}

function clearStatTable() {
    document.getElementById('statTable').outerHTML = "";
}

function getTableData(position) {
    var statTable = document.getElementById('statTable');
    var newRow = statTable.insertRow(1);
    newRow.setAttribute('id', 'loadingData');
    var newCell = newRow.insertCell(0);
    newCell.innerHTML = 'Loading Data';
    newCell.setAttribute('colspan', statTable.rows[0].cells.length);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // Response is ready
        if (this.readyState == 4 && this.status == 200) {
            parseData(xhttp.responseText, position);
            document.getElementById("loadingData").outerHTML = "";
        }
    };
    xhttp.open("GET", "https://flask-ss-heroku.herokuapp.com/players/"+position+"/", true);
    xhttp.send();
    return xhttp.onreadystatechange();
}

function parseData(data, position) {
    jsonResponse =JSON.parse(data);
    players = jsonResponse.Data;
    var newTable = document.getElementById('statTable');
    document.getElementById('statTableHeader').innerHTML = position;
    switch(position) {
        case 'QB':
            for (i = players.length-1; i >= 0; i--) {
                var newRow = newTable.insertRow(1);
                newRow.insertCell(0).innerHTML = players[i].player_name;
                newRow.insertCell(1).innerHTML = players[i].player_team;
                newRow.insertCell(2).innerHTML = players[i].passing_yds;
                newRow.insertCell(3).innerHTML = players[i].passing_tds;
                newRow.insertCell(4).innerHTML = players[i].passing_att;
                newRow.insertCell(5).innerHTML = players[i].passing_cmp;
                newRow.insertCell(6).innerHTML = players[i].passing_int;
            }
            break;
        default:
            for (i = players.length-1; i >= 0; i--) {
                var newRow = newTable.insertRow(1);
                newRow.insertCell(0).innerHTML = players[i].player_name;
                newRow.insertCell(1).innerHTML = players[i].player_team;
                newRow.insertCell(2).innerHTML = players[i].rushing_yds;
                newRow.insertCell(3).innerHTML = players[i].rushing_tds;
                newRow.insertCell(4).innerHTML = players[i].rushing_att;
                newRow.insertCell(5).innerHTML = players[i].receiving_yds;
                newRow.insertCell(6).innerHTML = players[i].receiving_tds;
                newRow.insertCell(7).innerHTML = players[i].receiving_rec;
            }
    }
}