document.addEventListener("DOMContentLoaded", function () {
  const studentInfo = document.getElementById("studentInfo");
  const gradesTable = document.getElementById("gradesTable");
  const average = document.getElementById("average");
  const logoutButton = document.getElementById("logoutButton");

  // Verificar si el usuario está guardado en localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    window.location.href = "./index.html"; // Redirigir al login si no está autenticado
  } else {
    studentInfo.innerHTML = `<p><strong>Código:</strong> ${usuario.codigo}</p><p><strong>Nombre:</strong> ${usuario.nombre}</p>`;
    fetchGrades(usuario.codigo);
  }

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("usuario"); // Borrar usuario de localStorage
    window.location.href = "./index.html"; // Redirigir al login
  });

  function fetchGrades(codigo) {
    fetch(`https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/notas`)
      .then(response => response.json())
      .then(data => {
        // Encuentra las notas del estudiante por el código
        const studentData = data.find(student => student.codigo === codigo);
        if (!studentData) {
          console.error('No se encontraron datos para el estudiante con código:', codigo);
          return;
        }
  
        let totalCredits = 0;
        let weightedSum = 0;
        let tableContent = studentData.notas.map(subject => {
          const def = calculateDefinitive(parseFloat(subject.n1), parseFloat(subject.n2), parseFloat(subject.n3), parseFloat(subject.ex));
          const credits = parseInt(subject.creditos, 10);
          totalCredits += credits;
          weightedSum += def * credits;
          return `<tr>
                    <td>${subject.asignatura}</td>
                    <td>${credits}</td>
                    <td>${subject.n1}</td>
                    <td>${subject.n2}</td>
                    <td>${subject.n3}</td>
                    <td>${subject.ex}</td>
                    <td>${def.toFixed(2)}</td>
                  </tr>`;
        }).join('');
        gradesTable.innerHTML = `<thead>
                                  <tr>
                                    <th>Asignatura</th>
                                    <th>Cre</th>
                                    <th>P1</th>
                                    <th>P2</th>
                                    <th>P3</th>
                                    <th>EF</th>
                                    <th>DEF</th>
                                  </tr>
                                </thead>
                                <tbody>${tableContent}</tbody>`;
        const promedioPonderado = weightedSum / totalCredits;
        average.innerHTML = `<p><strong>Promedio:</strong> ${promedioPonderado.toFixed(2)}</p>`;
      });
  }
  
  function calculateDefinitive(n1, n2, n3, ex) {
    return (n1 + n2 + n3) / 3 * 0.7 + ex * 0.3;
  }
  
});
