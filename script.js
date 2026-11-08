
// Get HTML elements
const internshipList = document.getElementById("internshipList");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");

const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");

const applicationDialog = document.getElementById("applicationDialog");
const applicationForm = document.getElementById("applicationForm");
const applicationSuccess = document.getElementById("applicationSuccess");

let selectedInternship = null;


// Display internship cards
function displayInternships(internshipData) {

    internshipList.innerHTML = "";
    emptyMessage.hidden = true;
    errorMessage.hidden = true;

    if (internshipData.length === 0) {
        emptyMessage.hidden = false;
        resultCount.textContent = "0 internships found";
        return;
    }

    internshipData.forEach(internship => {

        const card = document.createElement("article");
        card.className = "internship-card";

        const title = document.createElement("h3");
        title.textContent = internship.title;

        const company = document.createElement("p");
        company.textContent = "Company: " + internship.company;

        const location = document.createElement("p");
        location.textContent = "Location: " + internship.location;

        const duration = document.createElement("p");
        duration.textContent = "Duration: " + internship.duration;

        const stipend = document.createElement("p");
        stipend.textContent = "Stipend: " + internship.stipend;

        const domain = document.createElement("span");
        domain.className = "domain";
        domain.textContent = internship.domain;

        // Apply button
        const applyButton = document.createElement("button");
        applyButton.className = "apply-button";
        applyButton.textContent = "Apply Now →";

        applyButton.type = "button";

        applyButton.addEventListener("click", () => {
            openApplicationForm(internship);
        });

        card.append(
            title,
            company,
            location,
            duration,
            stipend,
            domain,
            applyButton
        );

        internshipList.appendChild(card);
    });

    resultCount.textContent =
        internshipData.length + " internships found";
}


// Open application form
function openApplicationForm(internship) {

    selectedInternship = internship;

    document.getElementById("selectedInternship").textContent =
        internship.title + " at " + internship.company;

    applicationSuccess.hidden = true;
    applicationForm.hidden = false;
    applicationForm.reset();

    applicationDialog.showModal();

    document.getElementById("studentName").focus();
}


// Search and filter
function filterInternships() {

    try {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedDomain = domainFilter.value;

        const filteredData = internships.filter(internship => {

            const matchesSearch =
                internship.title.toLowerCase().includes(searchText) ||
                internship.company.toLowerCase().includes(searchText);

            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;

            return matchesSearch && matchesDomain;
        });

        displayInternships(filteredData);

    } catch (error) {

        internshipList.innerHTML = "";
        resultCount.textContent = "Unable to load internships.";
        emptyMessage.hidden = true;
        errorMessage.hidden = false;

        console.error(error);
    }
}


// Search events
searchInput.addEventListener("input", filterInternships);
domainFilter.addEventListener("change", filterInternships);


// Close application form
document.getElementById("closeDialog").addEventListener("click", () => {
    applicationDialog.close();
});


// Submit application
applicationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!applicationForm.reportValidity()) {
        return;
    }

    const application = {
        internship: selectedInternship.title,
        company: selectedInternship.company,
        name: document.getElementById("studentName").value.trim(),
        email: document.getElementById("studentEmail").value.trim(),
        skills: document.getElementById("studentSkills").value.trim()
    };

    console.log("Demo application:", application);

    applicationForm.hidden = true;
    applicationSuccess.hidden = false;

});


// Display internships on page load
filterInternships();
