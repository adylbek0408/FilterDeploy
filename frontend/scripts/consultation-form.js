import { API_URL } from "./config.js";

export function initConsultationForms() {
  const ConsultationForms = document.querySelectorAll(".consultation-form");

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
      const name = form.querySelector(`#yname-${i}`).value.trim();
      const phone = form.querySelector(`#phone-${i}`).value.trim();

      if (!name || !phone) {
        alert("Заполните все поля!");
        return;
      }

      try {
        button.disabled = true;
        button.textContent = "Отправка...";

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

        alert("Данные отправлены успешно!");
        form.reset();
      } catch (error) {
        console.error(error);
        alert("Произошла ошибка, попробуйте позже.");
      } finally {
        button.disabled = false;
        button.textContent = "Получить консультацию";
      }
    });
  });
}
