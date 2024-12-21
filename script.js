// Seleciona todas as imagens dentro dos cards que podem ser expandidas
document.querySelectorAll('.expandable-image').forEach(image => {
    image.addEventListener('click', (event) => {
        expandImage(event.target); // Passa o alvo do evento (a imagem clicada)
    });
});

// Função para expandir a imagem
function expandImage(image) {
    const expandedImage = document.getElementById('expanded-image');
    const expandedImg = document.getElementById('expanded-img');
    
    expandedImg.src = image.src;  // Define a imagem expandida para ser a mesma da imagem clicada
    expandedImage.style.display = 'flex';  // Exibe a área expandida
}

// Função para fechar a imagem expandida
function closeImage() {
    document.getElementById('expanded-image').style.display = 'none';  // Oculta a área expandida
}
