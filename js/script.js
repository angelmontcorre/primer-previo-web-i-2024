document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const codigo = document.getElementById("codigo").value;
    const password = document.getElementById("password").value;

    // Leer el archivo JSON de estudiantes
    fetch("../json/students.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Verificar si las credenciales son válidas
        const student = data.find(student => student.codigo === codigo && student.clave === password);

        if (student) {
          // Credenciales válidas, guardar usuario en localStorage
          localStorage.setItem("usuario", JSON.stringify(student));

          // Redirigir a la interfaz de notas
          window.location.href = "../notas.html";
        } else {
          // Credenciales inválidas, mostrar mensaje de error
          alert("Las credenciales no son válidas. Por favor, inténtalo de nuevo.");
          
          // Limpiar los campos del formulario
          document.getElementById("codigo").value = "";
          document.getElementById("password").value = "";
        }
      })
      .catch(error => {
        console.error("Error al cargar el archivo JSON de estudiantes:", error);
        // Manejar el error de no encontrar el archivo JSON
        alert("Error al cargar el archivo JSON de estudiantes. Por favor, inténtalo de nuevo más tarde.");
      });
  });
});