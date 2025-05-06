import { API_URL, fetchCsrfToken } from "./config.js";

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

  // Функция для получения CSRF токена из куки
  function getCsrfToken() {
    const name = "csrftoken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  // Добавляем счетчик попыток отправки для устранения проблемы "через раз"
  let submissionAttempts = {};
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 500; // ms

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
    submissionAttempts[i] = 0;

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

      button.disabled = true;

      const sendFormData = async (retryCount = 0) => {
        try {
          // Пытаемся получить CSRF токен двумя способами
          let csrfToken = getCsrfToken();
          if (!csrfToken) {
            // Если токен не найден в куки, пробуем получить через API
            try {
              csrfToken = await fetchCsrfToken();
            } catch (error) {
              console.warn('Failed to fetch CSRF token, proceeding without it');
            }
          }

          // Проверяем, является ли API_URL полным URL или относительным путем
          const apiEndpoint = API_URL.startsWith('http') ? API_URL : `${window.location.origin}${API_URL}`;

          const headers = {
            "Content-Type": "application/json"
          };

          // Добавляем CSRF токен в заголовки, если он доступен
          if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
          }

          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: headers,
            credentials: "include", // Важно для правильной передачи куки
            body: JSON.stringify({
              name,
              phone
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server response:", response.status, errorData);

            // Ретрай логика при ошибках, которые могут быть временными
            if (retryCount < MAX_RETRIES && [0, 408, 429, 500, 502, 503, 504].includes(response.status)) {
              console.log(`Retry attempt ${retryCount + 1} after server error ${response.status}...`);
              setTimeout(() => sendFormData(retryCount + 1), RETRY_DELAY * (retryCount + 1));
              return;
            }

            throw new Error(`Ошибка отправки данных: ${response.status}`);
          }

          const data = await response.json();
          console.log("Order created successfully:", data);

          showNotification("Ваша заявка отправлена. С вами свяжутся!", "success");
          nameInput.value = "";
          phoneInput.value = "";
        } catch (error) {
          console.error("Error submitting form:", error);

          // Ретрай логика при сетевых ошибках
          if (retryCount < MAX_RETRIES) {
            console.log(`Retry attempt ${retryCount + 1} after error...`);
            setTimeout(() => sendFormData(retryCount + 1), RETRY_DELAY * (retryCount + 1));
            return;
          }

          showNotification("Упс...что-то пошло не так", "error");
        } finally {
          if (retryCount === MAX_RETRIES || retryCount === 0) {
            button.disabled = false;
          }
        }
      };

      sendFormData();
    });
  });
}
