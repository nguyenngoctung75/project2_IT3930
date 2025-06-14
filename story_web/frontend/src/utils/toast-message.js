import "./toast-message.css"
export const toast = ({ title = "", message = "", type = "info", duration = 3000 }) => {
    const main = document.getElementById("toast");
    if (main) {
    const toastElement = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(() => {
        main.removeChild(toastElement);
    }, duration + 1000);

    // Remove toast on click
    toastElement.onclick = (e) => {
        if (e.target.closest(".toast__close")) {
        main.removeChild(toastElement);
        clearTimeout(autoRemoveId);
        }
    };

    const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toastElement.classList.add("toast", `toast--${type}`);
    toastElement.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toastElement.innerHTML = `
        <div class="toast__icon">
        <i class="${icon}"></i>
        </div>
        <div class="toast__body">
        <h3 class="toast__title">${title}</h3>
        <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
        <i class="fas fa-times"></i>
        </div>
    `;
    main.appendChild(toastElement);
    }
};
