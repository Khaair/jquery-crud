$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:4000/api/show",
    dataType: "json",
    encode: true,
  })
    .done(function (data) {
      console.log(data);
      var rows = "";
      const del = "delete";
      $.each(data, function (index, user) {
        rows +=
          "<tr><td>" +
          user._id +
          "</td><td>" +
          user.title +
          "</td><td>" +
          user.author +
          "</td><td>" +
          user.body +
          "</td><td>" +
          "<button class='btn btn-danger btn-sm delete-btn' data-id='" +
          user._id +
          "'>Delete</button>" +
          "</td></tr>" +
          "<button class='btn btn-primary btn-sm edit-btn' data-id='" +
          user._id +
          "'>Edit</button>";
      });
      $("#myTable tbody").html(rows);

      // Attach click event handler to delete buttons
      $(".delete-btn").click(function () {
        var userId = $(this).data("id");
        $.ajax({
          type: "DELETE",
          url: "http://localhost:4000/api/delete/" + userId,
          dataType: "json",
          encode: true,
        })
          .done(function (data) {
            console.log(data);
            // Remove corresponding row from table
            $(this).closest("tr").remove();
          })
          .fail(function (xhr, status, error) {
            console.log(xhr.responseText);
            alert("Error deleting user. Please try again.");
          });
      });
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.responseText);
      alert("Error fetching user data. Please try again.");
    });
});

function handleDelete() {
  // Determine resource URL
  var resourceId = 123;
  var resourceUrl = "https://example.com/api/resources/" + resourceId;

  // Send HTTP DELETE request
  $.ajax({
    url: resourceUrl,
    type: "DELETE",
    success: function (response) {
      // Handle success response
      console.log("Resource deleted successfully.");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Handle error response
      console.log("Error deleting resource: " + textStatus + " " + errorThrown);
    },
  });
}

function handleSubmit() {
  var title = $("#title").val();
  var author = $("#author").val();
  var body = $("#body").val();

  var data = JSON.stringify({ title: title, author: author, body: body });

  $.ajax({
    type: "POST",
    data: data,
    contentType: "application/json",

    url: "http://localhost:4000/api/save",

    success: (data) => {
      $("#title").val("");
    },
    error: (data) => {
      console.log("Error: " + data);
    },
  });
}
