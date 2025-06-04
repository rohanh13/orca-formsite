let randomDiag = ''; 

document.addEventListener("DOMContentLoaded", () => {
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

      randomDiag = pickRandom(diagValues); // Save to global variable

      const para = document.getElementById("para1");
      if (para) {
        para.textContent = para.textContent.replace("(diagnosis)", randomDiag);
      }
    })
    .catch(error => console.error('Error loading diagnoses.json:', error));
});

document.getElementById('surveyForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Helper to get all selected checkbox values
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
    question4: getCheckboxValues('question4'),
    question5: getCheckboxValues('question5'),
    question6: getCheckboxValues('question6'),
    question7: getCheckboxValues('question7'),
    question8: getCheckboxValues('question8'),
    question9: getCheckboxValues('question9'),
    question10: document.getElementById('question10').value,
    question11: document.getElementById('question11').value
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

    alert('Survey submitted successfully!');
    document.getElementById('surveyForm').reset();
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting form.');
  }
});