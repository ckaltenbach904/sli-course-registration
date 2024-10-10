function showCertificationChoice() {
  const courseSelection = document.getElementById("courseSelection").value;
  const certificationChoice = document.getElementById("certificationChoice");
  const classPreference = document.getElementById("classPreference");
  const registrationForm = document.getElementById("registrationForm");
  const formHeader = document.getElementById("formHeader");
  const submitButton = document.getElementById("submitButton");

  if (courseSelection === "Certification") {
    certificationChoice.style.display = "block";
    classPreference.style.display = "none";
    registrationForm.style.display = "none";
    formHeader.textContent = "Certification Registration";
    submitButton.textContent = "Submit Certification Registration";
  } else if (courseSelection) {
    certificationChoice.style.display = "none"; // Hide certification choice
    classPreference.style.display = "block"; // Show class preference
    registrationForm.style.display = "none"; // Hide registration form until class type is chosen
    formHeader.textContent = courseSelection + " Registration";
    submitButton.textContent = "Submit " + courseSelection + " Registration";
  } else {
    certificationChoice.style.display = "none";
    classPreference.style.display = "none";
    registrationForm.style.display = "none";
  }
}

function showClassPreference() {
  const certificationType = document.getElementById("certificationType").value;
  const classPreference = document.getElementById("classPreference");
  const selectedCertification = document.getElementById(
    "selectedCertification"
  );
  const registrationForm = document.getElementById("registrationForm");

  if (certificationType) {
    classPreference.style.display = "block"; // Show class preference after certification selection
    registrationForm.style.display = "none"; // Hide registration form until class type is chosen
    selectedCertification.value = certificationType; // Set hidden field with selected certification type
  } else {
    classPreference.style.display = "none"; // Hide class preference if no certification selected
    registrationForm.style.display = "none"; // Hide registration form
  }
}

function showRegistrationForm() {
  const classType = document.getElementById("classType").value;
  const registrationForm = document.getElementById("registrationForm");
  const selectedClassType = document.getElementById("selectedClassType");

  // If a valid class type is selected, show the registration form
  if (classType) {
    registrationForm.style.display = "block";
    selectedClassType.value = classType; // Set hidden field with selected class type
  } else {
    registrationForm.style.display = "none"; // Hide registration form if no class type selected
  }
}

function initMap() {
  var location = { lat: 40.7128, lng: -74.006 }; // Coordinates for Frankfurt, Germany
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: location,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}
