function submitData() {
    const jobDescription = document.getElementById('job-description').value;
    const resumeFile = document.getElementById('resume').files[0];

    if (!jobDescription || !resumeFile) {
        alert("Please provide both job description and resume!");
        return;
    }

    // Prepare form data to send to backend
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);

    // Show loading message
    document.getElementById('result').innerHTML = 'Processing...';

    // Call backend API (replace URL with your backend endpoint)
    fetch('http://localhost:3000/api/screen', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Display the full error details in the frontend
            document.getElementById('result').innerHTML = `<strong>Error:</strong> ${JSON.stringify(data.error)}`;
        } else {
            // Display the result from OpenAI
            document.getElementById('result').innerHTML = `<strong>Result:</strong> ${data.feedback}`;
        }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `Error occurred while processing: ${error.message}`;
        console.error('Error:', error);
    });
}