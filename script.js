const courseAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourse);
  createCourseHandler();
}
start();

// get courses fucntion
function getCourses(callback) {
  fetch(courseAPI)
    .then((response) => response.json())
    .then(callback);
}

// render course to html
function renderCourse(courses) {
  const courseSection = document.querySelector("#courses-section");

  var htmls = courses.map((course) => {
    return `

      <li id="course-title-${course.id}">
        <h3>${course.name}</h3>
        <p>${course.discription}</p>
        <button onClick=deleteCourseHandler(${course.id})>Delete</button>
      </li>
    `;
  });
  courseSection.innerHTML = htmls.join("");
}

// create use fetch
function createCourse(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI, option)
    .then((response) => response.json())
    .then(function (course) {
      callback(course);
    });
}

// create a new course handler
function createCourseHandler() {
  var createBtn = document.querySelector("#createBtn");
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var discription = document.querySelector('input[name="discription"]').value;
    var courseData = {
      name: name,
      discription: discription,
    };
    createCourse(courseData, function (courses) {
      getCourses(renderCourse);
    });
  };
}

// delete a course
function deleteCourseHandler(courseId) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(courseAPI + "/" + courseId, option)
    .then((response) => response.json())
    .then(function () {
      var deleteCourse = document.querySelector(`#course-title-${courseId}`);
      deleteCourse.remove();
    });
}
