  document.getElementById('surveyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      question1: document.getElementById('question1').value,
      question2: document.getElementById('question2').value,
      question3: document.getElementById('question3').value,
      question4: document.getElementById('question4').value,
      question5: document.getElementById('question5').value,
      question6: document.getElementById('question6').value,
      question7: document.getElementById('question7').value,
      question8: document.getElementById('question8').value,
      question9: document.getElementById('question9').value,
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
   
   // Burger menu toggle logic
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }