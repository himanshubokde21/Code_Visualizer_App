// Sample Login Button Component
function createLoginButton(text = 'Login') {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.padding = '10px 20px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        alert('Login button clicked!');
    });

    return button;
}