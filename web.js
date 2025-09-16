document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('tareas');

    // Cargar tareas desde localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    // Función para guardar tareas en localStorage
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Función para renderizar la lista de tareas
    function renderizarTareas() {
        listaTareas.innerHTML = '';
        tareas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.className = tarea.completada ? 'tarea-completada' : '';

            const info = document.createElement('div');
            info.className = 'tarea-info';
            info.innerHTML = `<strong>${tarea.titulo}</strong> - ${tarea.materia} <br> Entrega: ${tarea.fechaEntrega} <br> ${tarea.descripcion}`;

            const acciones = document.createElement('div');
            acciones.className = 'tarea-acciones';

            const btnCompletar = document.createElement('button');
            btnCompletar.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
            btnCompletar.className = 'completar';
            btnCompletar.addEventListener('click', () => {
                tareas[index].completada = !tareas[index].completada;
                guardarTareas();
                renderizarTareas();
            });

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                tareas.splice(index, 1);
                guardarTareas();
                renderizarTareas();
            });

            acciones.appendChild(btnCompletar);
            acciones.appendChild(btnEliminar);

            li.appendChild(info);
            li.appendChild(acciones);

            listaTareas.appendChild(li);
        });
    }

    // Manejar envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nuevaTarea = {
            titulo: form.titulo.value.trim(),
            descripcion: form.descripcion.value.trim(),
            fechaEntrega: form['fecha-entrega'].value,
            materia: form.materia.value,
            completada: false
        };

        tareas.push(nuevaTarea);
        guardarTareas();
        renderizarTareas();
        form.reset();
    });

    // Renderizar tareas al cargar la página
    renderizarTareas();
});