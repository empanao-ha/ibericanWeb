// Selección del formulario
const form = document.querySelector('#formApplication');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Captura del campo email
    const emailInput = form.querySelector('input[name="email"]');
    const usernameInput = form.querySelector('input[name="username"]');
    const timezoneInput = form.querySelector('input[name="timezone"]');
    const experienceInput = form.querySelector('input[textarea="experience"]');
    const interestInput = form.querySelector('input[textarea="interest"]');
    const standoutInput = form.querySelector('input[textarea="standout"]');
    const openmessageInput = form.querySelector('input[textarea="openmessage"]');
    const applicationIdInput = form.querySelector('input[name="applicationId"]');


    const email = emailInput?.value.trim() || '';
    const username = usernameInput?.value.trim() || '';
    const timezone = timezoneInput?.value.trim() || '';
    const experiece = experienceInput?.value.trim() || '';
    const interest = interestInput?.value.trim() || '';
    const standout = standoutInput?.value.trim() || '';
    const openmessage = openmessageInput?.value.trim() || '';
    const applicationId = applicationIdInput?.value.trim() || '';


    // Validación sencilla de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email.');
      return;
    }

    try {
      // Llamada POST al webhook de n8n
      const response = await fetch('https://primary-production-4de3.up.railway.app/webhook/misitio/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email,
            username,
            timezone,
            experiece,
            interest,
            standout,
            openmessage,
            applicationId
         }),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      alert('Datos enviados correctamente');
    } catch (error) {

      alert('Hubo un error al enviar la información');
    }
  });
}
