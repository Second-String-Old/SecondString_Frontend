function refreshTable(position) {
    var newTable = document.createElement("TABLE");

    switch(position) {
        case 'QB':
            setHeader(position, newTable);
            clearStatTable();
            setTableStyle(newTable);
            document.getElementById('statDiv').appendChild(newTable);
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
            var header = table.insertRow(0);
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
            break
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

