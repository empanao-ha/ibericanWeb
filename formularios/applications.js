// Selección del formulario
const form = document.querySelector('#formApplication');
alert(form);
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Captura del campo email
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const email = emailInput?.value.trim() || '';
    const name = nameInput?.value.trim() || '';

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
            name
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
