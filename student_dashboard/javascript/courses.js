const courseAddBtn = document.getElementById("addCourseBtn");
const courseModal = document.querySelector("#modal-overlay-addCourse");
const courseForm = document.querySelector("#addCourseForm");
const cancelCourseFormBtn = document.getElementById("closeCourseFormBtn");
const courseCardContainer = document.getElementById("course-card-container");

//course footer variable;
const courseStatsCourses = document.getElementById("course-stat-total-course");
const courseStatsCredits = document.getElementById("total-course-credits");
const courseStatsCpi = document.getElementById("course-stat-cpi");

// Load user1 data or initialize it
let courseLocalData = JSON.parse(localStorage.getItem("user1")) || { courses: [] };
let courseList = courseLocalData.courses || [];

//  Render all courses on page load
function renderCourseCards() {
    courseCardContainer.innerHTML = "";
    let totalCredits = 0;
    let totalMarks = 0;
    courseList.forEach((course, index) => {
        addCourseCardToDOM(course, index);
        totalCredits += course.credit;
        totalMarks += course.totalMarks;
    }
    );

    //Maintaining the Stats
    courseStatsCourses.innerHTML = `Total Courses: ${courseList.length}`;
    courseStatsCredits.innerHTML = `Total Credits: ${totalCredits}`;
    courseStatsCpi.innerHTML = `Current CPI: ${calculateCPI()}`;
}

function calculateCPI() {
    let totalCredits = 0;
    let totalGradePoints = 0;
    //grade points = (midsemMarks * midsemWeight + endsemMarks * endsemWeight + quizMarks * quizWeight) / 100
    //grade point (91-100) = 10

    //grade point to grade conversion fucntion
    function getGradePoint(grade) {
        if (grade >= 90.5 && grade <= 100) {
            return 10;
        } else if (grade >= 80.5 && grade < 90.5) {
            return 9;
        } else if (grade >= 70.5 && grade < 80.5) {
            return 8;
        } else if (grade >= 60.5 && grade < 70.5) {
            return 7;
        } else if (grade >= 50.5 && grade < 60.5) {
            return 6;
        } else if (grade >= 40.5 && grade < 50.5) {
            return 5;
        } else if (grade >= 30.5 && grade < 40.5) {
            return 4;
        } else {
            return 0;
        }
    }
   
    //calculation of cpi
    courseList.forEach((course) => {
        const marksArr = course.marks;
        const totalMarksArr = course.totalMarks;
        const weightageArr = course.weightage;
        let totalMarksObtained = 0;
        
        for(let i = 0; i < marksArr.length; i++) {
            const marks = marksArr[i];
            const totalMarks = totalMarksArr[i];
            const weightage = weightageArr[i];
            
            totalMarksObtained += (marks / totalMarks) * weightage;
        }
        
        const gradePoint = getGradePoint(totalMarksObtained);
        totalGradePoints += gradePoint * course.credit;
        totalCredits += course.credit;
    });
    if (totalCredits === 0) {
        return 0;
    }
    return (totalGradePoints / totalCredits).toFixed(2);
}
//  Close modal on clicking outside

//  Add a single course card to DOM
function addCourseCardToDOM(course, index) {
    const div = document.createElement("div");
    div.classList.add("course-card");
    div.setAttribute("data-course-index", index);

    function getGradePoint(grade) {
        if (grade >= 90.50 && grade <= 100) {
            return "AA";
        } else if (grade >= 80.50 && grade < 90.5) {
            return "AB";
        } else if (grade >= 70.5 && grade < 80.5) {
            return "BB";
        } else if (grade >= 60.5 && grade < 70.5) {
            return "BC";
        } else if (grade >= 50.5 && grade < 60.5) {
            return "CC";
        } else if (grade >= 40.5 && grade < 50.5) {
            return "CD";
        } else if (grade >= 30.5 && grade < 40.5) {
            return "DD";
        } else {
            return "Chud Gaye";
        }
    }
    let totalMarksObtained = course.marks.reduce((acc, mark, i) => {
        return acc + (mark / course.totalMarks[i]) * course.weightage[i];
    }, 0);

    let gradePoint = getGradePoint(totalMarksObtained);
    
    div.innerHTML = `
        <div class="course-header">
            <h2>${course.title}</h2>
            <span class="credits">Grade: ${gradePoint}</span>
        </div>
        <p class="course-description">
            Total Marks: ${(course.totalMarks.join(', '))}<br>
            Marks Obtained: ${(course.marks.join(', '))}<br>
            Weightage: ${(course.weightage.join(', '))}<br>
            Total Marks Obtained: ${totalMarksObtained.toFixed(2)}<br>
        </p>
        <div class="tags">
            <span class="tag">Credits: ${course.credit}</span>
        </div>
        <div class="card-actions">
            <button class="edit-btn" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn delete-course-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    courseCardContainer.appendChild(div);
    

}


//Handle course card edit
document.addEventListener("click", (e) => {
    if (e.target.closest(".edit-btn")) {
        const card = e.target.closest(".course-card");
        const index = Number(card.getAttribute("data-course-index"));
        const course = courseList[index];

        document.getElementById("courseTitle").value = course.title;
        // document.getElementById("professor").value = course.prof;
        document.getElementById("credits").value = course.credit;
        document.getElementById("totalMarks").value = course.totalMarks.join('-');
        document.getElementById("marks").value = course.marks.join('-');
        document.getElementById("weight").value = course.weightage.join('-');

        courseModal.style.display = "flex";
        
        courseList.splice(index, 1);
        courseLocalData = JSON.parse(localStorage.getItem("user1")) || { courses: [] };
        courseLocalData.courses = courseList;
    }
});

//  Handle course form submission
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const courseName = document.getElementById("courseTitle").value;
    // const profName = document.getElementById("professor").value;
    const credits = Number(document.getElementById("credits").value);
    const totalMarks = document.getElementById('totalMarks').value.split('-').map(Number);
    const marksObtained = document.getElementById('marks').value.split('-').map(Number);
    const weightage = document.getElementById('weight').value.split('-').map(Number);

    if (totalMarks.length !== marksObtained.length || marksObtained.length !== weightage.length) {
        alert("Each field must have the same number of values!");
        return;
    }

    const newCourse = {
        title: courseName,
        credit: credits,
        marks: marksObtained,
        totalMarks: totalMarks,
        weightage: weightage
    };


    courseList.push(newCourse);
    courseLocalData = JSON.parse(localStorage.getItem("user1")) || { courses: [] };
    courseLocalData.courses = courseList;
    localStorage.setItem("user1", JSON.stringify(courseLocalData));

    renderCourseCards();
    courseForm.reset();
    courseModal.style.display = "none";
});



//  Handle deletion of a course
document.addEventListener("click", function (e) {
    if (e.target.closest(".delete-course-btn")) {
        const card = e.target.closest(".course-card");
        const index = Number(card.getAttribute("data-course-index"));

        courseList.splice(index, 1);
        courseLocalData = JSON.parse(localStorage.getItem("user1")) || { courses: [] };
        courseLocalData.courses = courseList;
        localStorage.setItem("user1", JSON.stringify(courseLocalData));

        renderCourseCards();
    }
});

//  Modal controls
courseAddBtn.addEventListener("click", () => {
    courseModal.style.display = "flex";
});

cancelCourseFormBtn.addEventListener("click", () => {
    courseModal.style.display = "none";
    courseForm.reset();
});

// Initial render
renderCourseCards();




