let randomDiag = ''; 

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("fromSubmit") === "true") {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      sessionStorage.removeItem("fromSubmit");
    }, 100); // delay 100ms to ensure scroll works
  }

  fetch('diagnoses.json')
    .then(res => res.json())
    .then(data => {
      function getValidValues(col) {
        return data.map(e => e[col]).filter(v => v);
      }

      const diagValues = getValidValues('diag');

      function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      randomDiag = pickRandom(diagValues); // Save to local variable

      const para = document.getElementById("para1");
      if (para) {
        para.innerHTML = para.innerHTML.replace("(diagnosis)", `<span class="bold">${randomDiag}</span>`);
      }

      const title = document.getElementsByClassName("form-section");
      for (let i = 0; i < title.length; i++) {
        const label = title[i].querySelector("label");
        if (label && label.textContent.includes("(diagnosis)")) {
          label.textContent = label.textContent.replace("(diagnosis)", randomDiag);
        }
      }

      const formGroups = document.getElementsByClassName("form-group");
      for (let i = 0; i < formGroups.length; i++) {
        const label = formGroups[i].querySelector("label");
        if (label && label.textContent.includes("(diagnosis)")) {
          label.textContent = label.textContent.replace("(diagnosis)", randomDiag);
        }
      }

      const formGroupsSA = document.getElementsByClassName("form-group-sa");
      for (let i = 0; i < formGroupsSA.length; i++) {
        const label = formGroupsSA[i].querySelector("label");
        if (label && label.textContent.includes("(diagnosis)")) {
          label.textContent = label.textContent.replace("(diagnosis)", randomDiag);
        }
      }
    })
    .catch(error => console.error('Error loading diagnoses.json:', error));
});

document.getElementById('surveyForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector('button[type="submit"]');
  // Change button appearance immediately on click
  submitBtn.textContent = 'Submitting...';
  submitBtn.style.backgroundColor = '#28a745'; // green
  submitBtn.classList.add('submitting');
  submitBtn.disabled = true;

  // Prepare form data as before
  const getCheckboxValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
      .map(cb => cb.value)
      .join(', ');
  };

  const formData = {
    diagnosis: randomDiag,
    question1: getCheckboxValues('question1'),
    question2: getCheckboxValues('question2'),
    question3: getCheckboxValues('question3'),
    question4: document.getElementById('question4').value,
    question5: getCheckboxValues('question5'),
    question6: getCheckboxValues('question6'),
    question7: getCheckboxValues('question7'),
    question8: getCheckboxValues('question8'),
    question9: getCheckboxValues('question9'),
    question10: document.getElementById('question10').value,
    question11: document.getElementById('question11').value,
    question12: document.getElementById('question12').value,
    question13: document.getElementById('question13').value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzHplXoz5RoUdBsRiI6nCQgObp9Yn06hW5_quO5upbQmHMNt-Su2_IE9jPof4xyICILvQ/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // After successful submit: reload after 2 seconds
    setTimeout(() => {
      sessionStorage.setItem("fromSubmit", "true");
      location.reload();
    }, 2000);

  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting form.');
    // Optionally re-enable button on failure
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    submitBtn.style.backgroundColor = '';
    submitBtn.classList.remove('submitting');
  }
});