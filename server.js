const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/photos', express.static(path.join(__dirname, 'public', 'photos')));

// Funkcja wczytująca projekty z JSON-a
function loadProjects(file) {
    const data = fs.readFileSync(path.join(__dirname, file), 'utf8');
    return JSON.parse(data).projects;
}

// Pojedynczy projekt
app.get('/project/:projectName', (req, res) => {
    const projects = loadProjects('projects.json');
    const project = projects.find(p => p.name.toLowerCase() === req.params.projectName.toLowerCase());

    if (!project) {
        return res.status(404).send("Projekt nie znaleziony.");
    }

    const imagesDir = path.join(__dirname, 'public', project.image);
    console.log("Szukam obrazów w:", imagesDir);

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error("Błąd odczytu katalogu:", err);
            return res.render('project_template', { project, imagePaths: [] });
        }

        const imagePaths = files.map(file => `${project.image}/${file}`);
        console.log("Znalezione pliki:", imagePaths);
        res.render('project_template', { project, imagePaths });
    });
});

// Trasa do portfolio
app.get('/Portfolio', (req, res) => {
    const technologyFilter = req.query.technology || ''; // Pobranie technologii z zapytania
    const projects = loadProjects('shortDescription.json');
    console.log('Dane projektów:', projects);  // Logowanie do debugowania

    // Pobieranie unikalnych technologii z projektów
    const allTechnologies = new Set();
    projects.forEach(project => {
        project.technology.forEach(tech => allTechnologies.add(tech));
    });

    const technologies = Array.from(allTechnologies);

    // Filtrowanie projektów na podstawie technologii (jeśli filtr ustawiony)
    const filteredProjects = technologyFilter
        ? projects.filter(project => project.technology.includes(technologyFilter))
        : projects;

    // Dodanie pełnej ścieżki do obrazów
    filteredProjects.forEach(project => {
        project.image = `${project.image}`;
    });

    // Renderowanie widoku
    res.render('portfolio_template', {
        projects: filteredProjects,
        technologies,
        technologyFilter
    });
});


// Konfiguracja EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Nasłuchiwanie na porcie
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
