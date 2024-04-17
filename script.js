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
                            <td class=" d-rl"><div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="completed-${index}" onchange="ToggleCompletion(${index})" ${
        task.completed ? "checked" : ""
      }>
        <label class="form-check-label" for="completed-${index}"></label>
    </div><button
        type="button"
        class="btn btn-danger px-2 py-1 "
        onclick="DeleteTask()"
      ><i class="fa-solid fa-trash"></i></button>
      <button type="button" class="btn btn-secondary px-2 py-1" onclick="EditTask(${index})">
      <i class="fa-solid fa-edit"></i>
      </button></td>
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

function DeleteTask(index) {
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  allEntries.splice(index, 1);
  localStorage.setItem("allEntries", JSON.stringify(allEntries));
  location.reload();
}

function EditTask(index) {
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  var task = allEntries[index];
  $("#description").val(task.description);
  $("#responsible").val(task.responsible);
  $("#eta").val(task.eta);
  $("#save").attr("onclick", `SaveEditedTask(${index})`);
  $("#exampleModal").modal("show");
}

function SaveEditedTask(index) {
  var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
  var formData = $("#task").serializeArray();
  var editedTask = {};

  $.each(formData, function (index, entry) {
    editedTask[entry.name] = entry.value;
  });

  editedTask.completed = allEntries[index].completed;
  allEntries[index] = editedTask;

  localStorage.setItem("allEntries", JSON.stringify(allEntries));
  $("#exampleModal").modal("hide");
  location.reload();
}

var allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
console.log(allEntries);
