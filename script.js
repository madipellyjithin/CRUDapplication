//!initial values
var selectedRow = null;
//!form submit logic
function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}
//!get method(Retriving the data)
function readFormData() {
  var formData = {};
  formData["patientId"] = document.getElementById("patientId").value;
  formData["patient"] = document.getElementById("patient").value;
  formData["visitors"] = document.getElementById("visitors").value;
  formData["perHour"] = document.getElementById("perHour").value;
  return formData;
}
//!insert the data (Post method)
function insertNewRecord(data) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.patientId;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.patient;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.visitors;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.perHour;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick = "onDelete(this)">Delete</button>`;
}
//!edit and update the data (Update method)
//editing the data(get)
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("patientId").value = selectedRow.cells[0].innerHTML;
  document.getElementById("patient").value = selectedRow.cells[1].innerHTML;
  document.getElementById("visitors").value = selectedRow.cells[2].innerHTML;
  document.getElementById("perHour").value = selectedRow.cells[3].innerHTML;
}
//updating the data
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.patientId;
  selectedRow.cells[1].innerHTML = formData.patient;
  selectedRow.cells[2].innerHTML = formData.visitors;
  selectedRow.cells[3].innerHTML = formData.perHour;
}
//!deleting the data (delete method)
//delete the data
function onDelete(td) {
  if (confirm("Are you sure about deleting😒 the data ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("storeList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function saveData() {
  let table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
  let data = [];
  for (let i = 0; i < table.rows.length; i++) {
    let cells = table.rows[i].cells;
    data.push({
      patientId: cells[0].innerHTML,
      patient: cells[1].innerHTML,
      visitors: cells[2].innerHTML,
      perHour: cells[3].innerHTML,
    });
  }
  localStorage.setItem("patientData", JSON.stringify(data));
}
function loadData() {
  let data = JSON.parse(localStorage.getItem("patientData")) || [];
  data.forEach(insertNewRecord);
}

//!reseting the values in form
