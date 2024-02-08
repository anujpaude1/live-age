function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    return match ? match[1] : null;
}



function updateWallpaper() {
    const birthdateInput = document.getElementById("birthdateInput");
    const darkModeCheckbox = document.getElementById("darkModeCheckbox");
    const container = document.getElementById("container");
    const ageContainer = document.getElementById("ageContainer");
    if(birthdateInput){
        const birthdate = birthdateInput.value;
        setCookie("birthdate", birthdate, 365);
    }


    const storedBirthdate = getCookie("birthdate");
    if (storedBirthdate) {
        const ageYears = calculateAgeInYears(storedBirthdate);
        const formattedAge = ageYears.toFixed(10);
        const isDarkMode = darkModeCheckbox ? darkModeCheckbox.checked : getCookie("darkMode");

            
        const textColor = isDarkMode ? "white" : "#333";
        const backgroundColor = isDarkMode ? "black" : "#f8f8f8";
            
        container.style.backgroundColor = backgroundColor;
        document.body.style.backgroundColor = backgroundColor

        // Update age container and style
        ageContainer.textContent = formattedAge;
        ageContainer.style.color = textColor;

        // Refresh age every 100ms
        setInterval(() => {
            const ageYears = calculateAgeInYears(storedBirthdate);
            const formattedAge = ageYears.toFixed(10);
            ageContainer.textContent = formattedAge;
        }, 100);

        // Reload the page to apply age changes
        // location.reload();
    }
}

function handleSubmit(){
    updateWallpaper()
    let inputSection = document.querySelector("#inputSection")
    const darkModeCheckbox = document.getElementById("darkModeCheckbox");
    if(inputSection){
        setCookie("darkMode", darkModeCheckbox ? darkModeCheckbox.checked : true , 365);
        location.reload()
    }
}

function calculateAgeInYears(birthdate) {
    const birthdateDate = new Date(birthdate);
    const currentDate = new Date();

    const ageMilliseconds = currentDate - birthdateDate;
    const ageYears = ageMilliseconds / (365.25 * 24 * 60 * 60 * 1000);

    return ageYears;
}

window.onload = () => {
    const storedBirthdate = getCookie("birthdate");
    const container = document.getElementById("container");

    if (storedBirthdate) {
        container.removeChild(document.getElementById("inputSection")); // Remove input section
        container.style.backgroundColor = "#f8f8f8";
        
        const ageContainer = document.getElementById("ageContainer");
        const ageYears = calculateAgeInYears(storedBirthdate);
        const formattedAge = ageYears.toFixed(10);
        ageContainer.textContent = formattedAge;
        
        const isDarkMode = getCookie("darkMode") === "true";
        console.log(isDarkMode)
        let darkModeCheckbox =  document.getElementById("darkModeCheckbox")
        if(darkModeCheckbox){
            darkModeCheckbox.checked = isDarkMode;
        }

        // Apply dark mode styling if necessary
        if (isDarkMode) {
            container.classList.add("dark-mode");
        }
        updateWallpaper()
    }
};
