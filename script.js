$(document).ready(function () {
  CreateHtmlStorage();
});

function ShowAddTask() {
  console.log("ShowAddTask");
}

function AddTask() {
  var formData = $("#task").serializeArray();
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || []; // Retrieve existing entries or create a new array

  var jsonData = {};

  // Convert formData array into JSON object
  $.each(formData, function (index, entry) {
    jsonData[entry.name] = entry.value;
  });

  // Add a "completed" property to indicate if the task is completed (initially false)
  jsonData.completed = false;

  // Push the new entry into the array
  allEntries.push(jsonData);

  // Store JSON string in local storage
  localStorage.setItem("allEntries", JSON.stringify(allEntries));

  // Clear the form
  $("#task")[0].reset();
  location.reload();
}

function CloseAddTask() {
  $("#save").show();
}

function CreateHtmlStorage() {
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  if (allEntries.length > 0) {
    $.each(allEntries, function (index, task) {
      var sr = index + 1;
      var taskHtml = `
                        <tr>
                            <th scope="row">${sr}</th>
                            <td>${task.description}</td>
                            <td>${task.responsible}</td>
                            <td>${task.eta}</td>
                            <td "><i class="fa-solid fa-pen-to-square"><input type="checkbox" onchange="ToggleCompletion(${index})" ${
        task.completed ? "checked" : ""
      }></i></td>
                        </tr>`;
      $("#tablebody").append(taskHtml);
    });
  }
}

function ToggleCompletion(index) {
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  allEntries[index].completed = !allEntries[index].completed;
  localStorage.setItem("allEntries", JSON.stringify(allEntries));
}

function RefreshPage() {
  location.reload();
}

function ClearStorage() {
  localStorage.clear();
  location.reload();
}
var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

console.log(allEntries);
