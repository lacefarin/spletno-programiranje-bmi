function onConfirmButtonPressed() {
	const firstName = document.getElementById('fname').value
	const lastName = document.getElementById('lname').value
	const isFemaleChecked = document.getElementById('genderFemale').checked
	const isMaleChecked = document.getElementById('genderMale').checked
	const height = document.getElementById('height').value
	const weight = document.getElementById('weight').value
	const dateOfBirthString = document.getElementById('dbirth').value
	const dateOfFirstEmploymentString = document.getElementById('dwork').value
	let birthDate = new Date()
	let firstEmploymentDate= new Date()
	let isPresented = false
	let isCheckedBoolList = []
	let today = new Date()


	const fNameErrorContainerId = "fNameErrorContainer"
	isPresented = firstName.trim().length == 0
	isCheckedBoolList.push(!isPresented)
	presentOrDismissErrorInCotainer(fNameErrorContainerId, isPresented)

	const lNameErrorContainerId = "lNameErrorContainer"
	isPresented = lastName.trim().length == 0
	isCheckedBoolList.push(!isPresented)
	presentOrDismissErrorInCotainer(lNameErrorContainerId, isPresented)

	const genderErrorContainerId = "genderErrorContainer"
	isPresented = !isFemaleChecked && !isMaleChecked
	isCheckedBoolList.push(!isPresented)
	presentOrDismissErrorInCotainer(genderErrorContainerId,isPresented)

	const heightErrorContainerId = "heightErrorContainer"
	isPresented = !isPositiveNumber(height)
	isCheckedBoolList.push(!isPresented)
	presentOrDismissDataInWrongFormatErrorInCotainer(heightErrorContainerId, isPresented)

	// If previous error wasn't shown
	// then check for presenting wrong format error
	if (!isPresented) {
		isPresented = !height
		isCheckedBoolList.push(!isPresented)
		presentOrDismissErrorInCotainer(heightErrorContainerId, isPresented)
	}
	
	const weightErrorContainerId = "weightErrorContainer"
	isPresented = !isPositiveNumber(weight)
	isCheckedBoolList.push(!isPresented)
	presentOrDismissDataInWrongFormatErrorInCotainer(weightErrorContainerId, isPresented)

	// If previous error wasn't shown
	// then check for presenting wrong format error
	if (!isPresented) {
		isPresented = !weight
		isCheckedBoolList.push(!isPresented)
		presentOrDismissErrorInCotainer(weightErrorContainerId, isPresented)
	}

	const dBirthErrorContrainerId = "dBirthErrorContainer"
	isPresented = !dateOfBirthString
	isCheckedBoolList.push(!isPresented)
	presentOrDismissErrorInCotainer(dBirthErrorContrainerId, isPresented)

	// If previos error wasn't presented
	// check that birth date is not higher than today
	if (!isPresented) {
		birthDate = new Date(dateOfBirthString)
		isPresented = birthDate > today
		isCheckedBoolList.push(!isPresented)
		presentOrDismissBirthDateMustBeLowerThanTodayDateErrorInCotainer(dBirthErrorContrainerId, isPresented)
	}

	const dWorkErrorContainerId = "dWorkErrorContainer"
	isPresented = !dateOfFirstEmploymentString
	isCheckedBoolList.push(!isPresented)
	presentOrDismissErrorInCotainer(dWorkErrorContainerId, isPresented)

	// If previos error wasn't presented
	// check that work date is not lower than date birth
	if(!isPresented) {
		firstEmploymentDate = new Date(dateOfFirstEmploymentString)
		isPresented = firstEmploymentDate <= birthDate || firstEmploymentDate > today
		isCheckedBoolList.push(!isPresented)
		presentOrDismissWorkDateMustBeGreaterThanBirthDateInContainer(dWorkErrorContainerId, isPresented)
	}

	// if all values are checked and valid
	if (!isCheckedBoolList.includes(false)) {
		// Present thank you div
		presentThankYouDiv()
		// Refresh calculated data input
		const heightAsFloat = Number.parseFloat(height)
		const weightAsFloat = Number.parseFloat(weight)
		refreshCalculatedDataInput(firstName, lastName, heightAsFloat, weightAsFloat, firstEmploymentDate, isMaleChecked)
	}
}

function presentThankYouDiv() {
	const inputContainer = document.getElementById("inputData")
	inputContainer.setAttribute("style", "text-align: center;")
	inputContainer.innerHTML = "<img src='checkmark.jpeg' alt='checkmark' style='width:128px;height:128px;'><h1>Hvala lepa</h1><p>vaši podatki so pravilno vpisano, ogleje si rezultate izračuna na desni strani</p><button type='button'>DONE</button>"
}

function refreshCalculatedDataInput(fName, lName, height, weight, firstEmploymentDate, isMale) {
	const outputContainer = document.getElementById("outputData")
	const titleContent = "<h3>Izračun podatkov</h3><hr>"
	const welcomeContent = `<p>Spoštovani <i>${fName} ${lName}</i></p>`
	const bmiContent = "<p>Na podlagi podatkov, ki ste jih vpisali ugotavljamo, da znaša vaš indeks telesne mase:</p>"
	const bmi = calculateBMI(height, weight)
	const categoryText = categoryForBMI(bmi)
	const color = colorForBMI(bmi)
	const bmiCalculatedContent = `<p style='color:${color}'><i>${bmi} kg/m<sup>2</sup> - ${categoryText}</i></p>`
	const numberOfWorkYears = calculateNumberOfWorkYears(firstEmploymentDate)
	const numberOfLeftWork = calculateNumberOfYearsMonthsDaysTillPension(firstEmploymentDate, isMale)
	const years = numberOfLeftWork.years
	const months = numberOfLeftWork.months
	const days = numberOfLeftWork.days
	const workingYearsContent = `<p>Za seboj imate že <i>${numberOfWorkYears}</i> let delovne dobe in do upokojitve imate še <i>${years}<i> let, <i>${months}</i> mesecev in <i>${days}</i> dni dela.</p>`
	outputContainer.innerHTML = titleContent + welcomeContent + bmiContent + bmiCalculatedContent + workingYearsContent
}

function presentOrDismissWorkDateMustBeGreaterThanBirthDateInContainer(containerId, isPresented) {
	if (isPresented) {
		addWorkDateMustBeGreaterThanBirthDateParagraphToErrorContainer(containerId)
	} else {
		emptyErrorContainer(containerId)
	}
}

function presentOrDismissErrorInCotainer(containerId, isPresented) {
	if (isPresented) {
		addParagraphToErrorContainer(containerId)
	} else {
		emptyErrorContainer(containerId)
	}
}

function presentOrDismissDataInWrongFormatErrorInCotainer(containerId, isPresented) {
	if (isPresented) {
		addDataInWrongFormatParagraphToErrorContainer(containerId)
	} else {
		emptyErrorContainer(containerId)
	}
}

function presentOrDismissBirthDateMustBeLowerThanTodayDateErrorInCotainer(containerId, isPresented) {
	if (isPresented) {
		addBirthDateMustBeLowerThanTodayDateParagraphToErrorContainer(containerId)
	} else {
		emptyErrorContainer(containerId)
	}
}

function addParagraphToErrorContainer(containerId) {
	const errorContainer = document.getElementById(containerId)
	errorContainer.innerHTML = "<p style='color:red;margin: 0px 0px 5px 0px;'>*Obvezen podatek.</p>"
}

function emptyErrorContainer(containerId) {
	const errorContainer = document.getElementById(containerId)
	errorContainer.innerHTML = ""
}

function addDataInWrongFormatParagraphToErrorContainer(containerId) {
	const errorContainer = document.getElementById(containerId)
	errorContainer.innerHTML = "<p style='color:red;margin: 0px 0px 5px 0px;'>*Napačna oblika podatka.</p>"
}

function addWorkDateMustBeGreaterThanBirthDateParagraphToErrorContainer(containerId) {
	const errorContainer = document.getElementById(containerId)
	errorContainer.innerHTML = "<p style='color:red;margin: 0px 0px 5px 0px;'>*Datum prve zaposlitve mora biti večji od datuma rojstva in ne more biti večji od današnjega datuma.</p>"
}

function addBirthDateMustBeLowerThanTodayDateParagraphToErrorContainer(containerId) {
	const errorContainer = document.getElementById(containerId)
	errorContainer.innerHTML = "<p style='color:red;margin: 0px 0px 5px 0px;'>*Datum rojstva ne more biti večji od današnjega datuma.</p>"
}

function calculateBMI(height, weight) {
	const heightInMeters = height / 100
	const bmi = weight / (heightInMeters * heightInMeters)
	return bmi.toFixed(2)
}

function categoryForBMI(bmi) {
	if (bmi < 18.5) {
		return "Nedohranjenost"
	} else if (bmi >= 18.5 && bmi <= 24.99) {
		return "Normalna telesna teža"
	} else if (bmi >= 25.0 && bmi <= 29.99) {
		return "Povišana telesna teža"
	} else if (bmi >= 30.0 && bmi <= 34.99) {
		return "Debelost - Razred I"
	} else if (bmi >= 35.0 && bmi <= 39.99) {
		return "Debelost - Razred II"
	} else {
		return "Debelost - Razred III"
	}
}

function colorForBMI(bmi) {
	if (bmi < 18.5) {
		return "blue"
	} else if (bmi >= 18.5 && bmi <= 24.99) {
		return "green"
	} else {
		return "red"
	}
}

function calculateNumberOfWorkYears(firstEmploymentDate) {
	const today = new Date()
  	const diffInHours = Math.abs(today - firstEmploymentDate) / (1000 * 60 * 60)
  	const diffInYears = diffInHours / 8760
  	return diffInYears.toFixed(3)
}

function calculateNumberOfYearsMonthsDaysTillPension(firstEmploymentDate, isMale) {
	const today = new Date()
  	let lastDayOfWork = new Date()
  	if (isMale) {
		lastDayOfWork.setFullYear(firstEmploymentDate.getFullYear() + 45)
  	} else {
  		lastDayOfWork.setFullYear(firstEmploymentDate.getFullYear() + 40)
  	}

  	if (lastDayOfWork < today) {
  		return {
  			years: 0,
  			months: 0,
  			days: 0
  		}
  	}

  	const daysDiff = Math.ceil((Math.abs(lastDayOfWork - today)) / (1000 * 60 * 60 * 24));

    var years = Math.floor(daysDiff / 365.25);
    var remainingDays = Math.floor(daysDiff - (years * 365.25));
    var months = Math.floor((remainingDays / 365.25) * 12);
    var days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));

    return {
        years: years,
        months: months,
        days:days
    }
  	
}

function isPositiveNumber(str) {
	const numberAsFloat = Number.parseFloat(str)

	if (Number.isNaN(numberAsFloat))  {
	   return false;
	}

	if (numberAsFloat > 0) {
		return true;
	}

	return false;
}