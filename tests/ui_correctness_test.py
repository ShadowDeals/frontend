import time

import utils as u
from utils import GENERAL_SLEEP_CONSTANT
from selenium.webdriver.common.by import By

def ui_correctness_test():
    u.click_button_by_text("Войти")
    time.sleep(GENERAL_SLEEP_CONSTANT)
    check_login_page_dom()
    check_login_validation_errors()

    home_link = u.driver.find_element(By.LINK_TEXT, "На главную")
    home_link.click()


def check_login_validation_errors():
    driver = u.driver
    try:
        time.sleep(GENERAL_SLEEP_CONSTANT)

        email_input = driver.find_element(By.NAME, "email")
        assert email_input.is_displayed(), "Поле Email не видно"
        assert email_input.get_attribute("aria-invalid") == "true", "Поле Email не подсвечено красным"

        email_helper_id = email_input.get_attribute("aria-describedby")
        email_error = driver.find_element(By.ID, email_helper_id)
        assert "введите" in email_error.text.lower(), f"Сообщение об ошибке Email некорректно: {email_error.text}"

        password_input = driver.find_element(By.NAME, "password")
        assert password_input.is_displayed(), "Поле Password не видно"
        assert password_input.get_attribute("aria-invalid") == "true", "Поле Password не подсвечено красным"

        password_helper_id = password_input.get_attribute("aria-describedby")
        password_error = driver.find_element(By.ID, password_helper_id)
        assert "введите" in password_error.text.lower(), f"Сообщение об ошибке Password некорректно: {password_error.text}"

        print("Ошибки валидации отображаются корректно")

    except Exception as e:
        print(f"Ошибка проверки валидации: {e}")


def check_login_page_dom():
    try:
        driver = u.driver

        email_input = driver.find_element(By.NAME, "email")
        assert email_input.is_displayed(), "Поле Email не видно"
        focus_and_blur(email_input)

        password_input = driver.find_element(By.NAME, "password")
        assert password_input.is_displayed(), "Поле Password не видно"
        focus_and_blur(password_input)

        login_button = driver.find_element(By.XPATH, ".//button[contains(text(),'Войти')]")
        assert login_button.is_displayed(), "Кнопка Войти не видна"

        print("DOM-структура страницы авторизации корректна")

    except Exception as e:
        print(f"Ошибка проверки DOM: {e}")


def focus_and_blur(element, blur_target_tag="body", pause=0.2):
    element.click()
    time.sleep(pause)

    element.parent.find_element(By.TAG_NAME, blur_target_tag).click()
    time.sleep(pause)
