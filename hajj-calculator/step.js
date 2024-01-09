// Get the backward button from the navbar
const backwardButton = document.querySelector('[st-calback="true"]');

// Get all the step wrappers
const stepWrappers = document.querySelectorAll('[st-cal^="step"]');

// Get all the buttons
const buttons = document.querySelectorAll('[st-target^="step"]');

// Function to hide all step wrappers
function hideAllSteps() {
	stepWrappers.forEach((wrapper) => {
		wrapper.style.display = "none";
	});
}

// Function to show a specific step wrapper
function showStep(step) {
	const targetWrapper = document.querySelector(`[st-cal="${step}"]`);
	if (targetWrapper) {
		targetWrapper.style.display = "flex";
		window.scrollTo({ top: targetWrapper.offsetTop, behavior: "smooth" });
	}
}

// Function to hide a specific step wrapper
function hideStep(step) {
	const targetWrapper = document.querySelector(`[st-cal="${step}"]`);
	if (targetWrapper) {
		targetWrapper.style.display = "none";
	}
}

// Function to get the current step
function getCurrentStep() {
	const visibleWrapper = document.querySelector(
		'[st-cal]:not([style*="display: none"])'
	);
	return visibleWrapper ? visibleWrapper.getAttribute("st-cal") : null;
}

// Function to get the previous step
function getPreviousStep(currentStep) {
	const currentStepNumber = parseInt(currentStep.slice(5));
	const previousStepNumber = currentStepNumber - 1;
	return `step-${previousStepNumber}`;
}

// Function to update backward button display
function updateBackwardButtonDisplay(previousStep) {
	backwardButton.style.display = previousStep !== "step-1" ? "flex" : "none";
}

// Event listener for backward button click
backwardButton.addEventListener("click", () => {
	const currentStep = getCurrentStep();
	if (currentStep) {
		const previousStep = getPreviousStep(currentStep);
		console.log(`Navigating backward from ${currentStep} to ${previousStep}`);
		showStep(previousStep);
		hideStep(currentStep);
		backwardButton.setAttribute("st-target", previousStep);
		updateBackwardButtonDisplay(previousStep);
	}
});

// Add click event listeners to each button
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const targetStep = button.getAttribute("st-target");
		hideAllSteps();
		showStep(targetStep);
		backwardButton.setAttribute("st-target", getPreviousStep(targetStep));
		updateBackwardButtonDisplay(targetStep);
	});
});

// Initially hide all steps except the first one
hideAllSteps();
showStep("step-1");

// Hide the backward button on the first step
if (getCurrentStep() === "step-1") {
	backwardButton.style.display = "none";
}
