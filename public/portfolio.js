document.addEventListener("DOMContentLoaded", function() {
    // Nasłuchuj kliknięcia w przycisk resetowania filtru
    document.getElementById('resetFilterBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Zapobiegaj domyślnej akcji
        resetFilter(); // Wywołaj funkcję resetującą
    });
});

// Funkcja resetująca filtr
function resetFilter() {
    const select = document.getElementById('technology');
    if (select.value !== '') {
        select.value = ''; // Resetowanie wartości select
        document.getElementById('technologyForm').submit(); // Wysłanie formularza po zmianie wartości
    }
}
