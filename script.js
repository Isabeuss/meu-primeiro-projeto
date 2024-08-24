document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.getElementById('copyButton');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const text = document.getElementById('text');
    const response = document.querySelector('.response');
    const warning = document.getElementById('warning');

    const encryptionRules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const decryptionRules = Object.fromEntries(
        Object.entries(encryptionRules).map(([key, value]) => [value, key])
    );

    function encrypt(text) {
        return text.split('').map(char => encryptionRules[char] || char).join('');
    }

    function decrypt(text) {
        return Object.entries(decryptionRules).reduce((acc, [pattern, replacement]) => 
            acc.split(pattern).join(replacement), text
        );
    }

    function updateResponse(text) {
        response.value = text;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao tentar copiar o texto:', err);
        });
    }

    function showWarning() {
        warning.style.display = 'block';
    }

    function hideWarning() {
        warning.style.display = 'none';
    }

    encryptButton.addEventListener('click', () => {
        if (text.value.trim() === '') {
            showWarning();
            return;
        }
        hideWarning();
        const encryptedText = encrypt(text.value);
        response.style.backgroundImage = 'none';
        updateResponse(encryptedText);
        copyButton.style.display = 'block';
    });

    decryptButton.addEventListener('click', () => {
        if (text.value.trim() === '') {
            showWarning();
            return;
        }
        hideWarning();
        const decryptedText = decrypt(text.value);
        response.style.backgroundImage = 'none';
        updateResponse(decryptedText);
        copyButton.style.display = 'block';
    });

    copyButton.addEventListener('click', () => {
        copyToClipboard(response.value);
    });
});
