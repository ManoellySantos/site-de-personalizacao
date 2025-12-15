document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const items = Array.from(track.children);
    
    let currentIndex = 0; // O índice do primeiro item visível
    
    // Função para calcular quantos itens cabem na tela
    const getVisibleItemCount = () => {
        const containerWidth = track.parentElement.clientWidth;
        const itemWidth = items[0].getBoundingClientRect().width;
        // Divide a largura do contêiner pela largura de um item para saber quantos cabem.
        // Arredondamos para baixo.
        return Math.floor(containerWidth / itemWidth);
    };

    // Função principal para mover o carrossel
    const moveToSlide = (targetIndex) => {
        // Encontra o item alvo para calcular o deslocamento
        const targetItem = items[targetIndex];
        
        // Calcula a posição de deslocamento (em pixels)
        const displacement = targetItem.offsetLeft;
        
        // Aplica a translação (movimento)
        track.style.transform = `translateX(-${displacement}px)`;
        currentIndex = targetIndex;
        
        updateButtonState();
    };

    // Função para atualizar o estado dos botões (habilitado/desabilitado)
    const updateButtonState = () => {
        const visibleCount = getVisibleItemCount();
        const lastPossibleIndex = items.length - visibleCount;

        // Botão Esquerdo: Desabilitado se estiver no primeiro item
        btnLeft.disabled = (currentIndex === 0);
        
        // Botão Direito: Desabilitado se o índice do primeiro item visível 
        // + o número de itens visíveis for maior ou igual ao número total de itens
        btnRight.disabled = (currentIndex >= lastPossibleIndex);
    };
    
    // Ação do Botão Direito (Próximo)
    btnRight.addEventListener('click', () => {
        const visibleCount = getVisibleItemCount();
        const lastPossibleIndex = items.length - visibleCount;
        
        // Move pelo número de itens visíveis para ter uma navegação de "página"
        let nextIndex = currentIndex + visibleCount;
        
        // Garante que o índice não passe do limite máximo de rolagem
        if (nextIndex > lastPossibleIndex) {
            nextIndex = lastPossibleIndex;
        }

        moveToSlide(nextIndex);
    });

    // Ação do Botão Esquerdo (Anterior)
    btnLeft.addEventListener('click', () => {
        const visibleCount = getVisibleItemCount();
        
        // Move para trás pelo número de itens visíveis
        let prevIndex = currentIndex - visibleCount;
        
        // Garante que o índice não seja menor que 0
        if (prevIndex < 0) {
            prevIndex = 0;
        }
        
        moveToSlide(prevIndex);
    });

    // Inicialização e Recálculo ao Redimensionar
    const initCarousel = () => {
        // Garante que a primeira posição seja 0
        moveToSlide(0); 
    };
    
    window.addEventListener('resize', initCarousel);
    initCarousel(); // Executa ao carregar a página
});
