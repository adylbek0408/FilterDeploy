import { API_URL } from "./config.js";

export function initConsultationForms() {
  const ConsultationForms = document.querySelectorAll(".consultation-form");

  let notificationContainer = document.querySelector(".notification-container");
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    document.body.appendChild(notificationContainer);
  }

  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("hide");
      notification.addEventListener("transitionend", () => {
        notification.remove();
      });
    }, 3000);
  }

  ConsultationForms.forEach((form, i) => {
    form.innerHTML += `
      <div class="input-field">
        <label for="yname-${i}">Имя*</label>
        <input type="text" id="yname-${i}" placeholder="Ваше имя" />
      </div>
      <div class="input-field">
        <label for="phone-${i}">Номер телефона*</label>
        <input type="text" id="phone-${i}" placeholder="+996 555 555 555" />
      </div>
      <button type="button" class="btn btn-solid btn-secondary">
        Получить консультацию
      </button>
    `;

    const button = form.querySelector("button");
    button.addEventListener("click", async () => {
      const nameInput = form.querySelector(`#yname-${i}`);
      const phoneInput = form.querySelector(`#phone-${i}`);
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name) {
        showNotification('Заполните поле "Имя"', "error");
        return;
      }

      if (!phone) {
        showNotification('Заполните поле "Номер телефона"', "error");
        return;
      }

      try {
        button.disabled = true;

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone }),
        });

        if (!response.ok) {
          throw new Error("Ошибка отправки данных");
        }

        showNotification("Ваша заявка отправлена. С вами свяжутся!", "success");
        nameInput.value = "";
        phoneInput.value = "";
      } catch (error) {
        console.error(error);
        showNotification("Упс...что-то пошло не так", "error");
      } finally {
        button.disabled = false;
      }
    });
  });
}
