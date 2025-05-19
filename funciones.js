document.addEventListener('DOMContentLoaded', () => {
  const nueva = document.getElementById('nueva');
  const agregar = document.getElementById('agregar');
  const lista = document.getElementById('lista');

  agregar.addEventListener('click', () => {
    const texto = nueva.value.trim();
    if (texto !== '') {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = texto;

      const btnOk = document.createElement('button');
      btnOk.textContent = 'OK';
      btnOk.classList.add('btn-ok');
      btnOk.addEventListener('click', () => {
        li.remove();
      });

      li.appendChild(span);
      li.appendChild(btnOk);
      lista.appendChild(li);
      nueva.value = '';
    }

  });
});
