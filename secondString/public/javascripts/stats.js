function refreshTable(position) {
    var newTable = document.createElement("TABLE");

    switch(position) {
        case 'QB':
            setHeader(position, newTable);
            clearStatTable();
            setTableStyle(newTable);
            document.getElementById('statDiv').appendChild(newTable);
            getTableData(position);
        case RB:
            break;
        case WR:
            break
        case TE:
            break;
    }
}

function setHeader(position, table) {
    switch(position) {
        case 'QB':
            var tHead = table.createTHead();
            var header = tHead.insertRow(0);
            header.insertCell(0).innerHTML = 'Name';
            header.insertCell(1).innerHTML = 'Team';
            header.insertCell(2).innerHTML = 'Passing Yards';
            header.insertCell(3).innerHTML = 'Passing Touchdowns';
            header.insertCell(4).innerHTML = 'Passing Attempts';
            header.insertCell(5).innerHTML = 'Passing Completions';
            header.insertCell(6).innerHTML = 'Interceptions';
        case RB:
            break;
        case WR:
            break;
        case TE:
            break;
    }
}

function setTableStyle(table) {
    table.setAttribute('class', 'stat-table');
    table.setAttribute('id', 'statTable');
}

function clearStatTable() {
    document.getElementById('statTable').outerHTML = "";
}

function getTableData(position) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // Response is ready
        if (this.readyState == 4 && this.status == 200) {
            console.log("response:");
            parseData(xhttp.responseText, position);
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
    switch(position) {
        case 'QB':
            document.getElementById('statTableHeader').innerHTML = 'Quarter Backs';
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
        case RB:
            break;
        case WR:
            break;
        case TE:
            break;
    }
}