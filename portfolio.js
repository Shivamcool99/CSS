document.addEventListener("DOMContentLoaded", function () {
    var typingEffect1 = new Typed(".typedText1", {
        strings: ["안녕하세요!", "Hello!", "Hola!", "Bonjour!", "Ciao!", "Konnichiwa!", "Guten Tag!", "नमस्ते!"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000
    });

    var typingEffect2 = new Typed(".typedText", {
        strings: ["Java Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000
    });
});

function slideLeft() {
    // Implement slide left functionality
}

function slideRight() {
    // Implement slide right functionality
}

document.querySelector(".contact-icon").addEventListener('click', function() {
    window.open('https://wa.me/7078258867'); // Replace with your actual WhatsApp number
});
