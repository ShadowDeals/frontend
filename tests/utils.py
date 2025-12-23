import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

from credentials import TEST_USER_EMAILS_BY_ROLE, DEFAULT_TEST_PASSWORD


driver: webdriver.Firefox | None = None

GENERAL_SLEEP_CONSTANT = 0.5

def click_radio_by_id(radio_id: str):
    global driver
    try:
        radio = driver.find_element(By.ID, radio_id)

        ActionChains(driver).move_to_element(radio).click().perform()

        print(f"Кликнули по радио с id='{radio_id}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)

    except NoSuchElementException:
        print(f"Радио с id='{radio_id}' не найдено")

def click_first_option_in_select_by_id(select_id: str):
    global driver
    try:
        select = driver.find_element(By.ID, select_id)
        options = select.find_elements(By.TAG_NAME, "option")

        if not options:
            print(f"В select id='{select_id}' нет option")
            return

        for opt in options:
            if opt.is_enabled():
                opt.click()
                print(f"Кликнули по option '{opt.text.strip()}' в select id='{select_id}'")
                time.sleep(GENERAL_SLEEP_CONSTANT)
                return

        print(f"В select id='{select_id}' нет доступных option")

    except NoSuchElementException:
        print(f"Select с id='{select_id}' не найден")
def click_button_by_id(button_id: str):
    global driver
    try:
        button = driver.find_element(By.ID, button_id)
        button.click()
        print(f"Кликнули на кнопку с id='{button_id}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print(f"Кнопка с id='{button_id}' не найдена")


def click_svg_by_testid(testid: str):
    global driver
    try:
        svg_element = driver.find_element(By.CSS_SELECTOR, f"svg[data-testid='{testid}']")
        svg_element.click()
        print(f"Кликнули на SVG с data-testid='{testid}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print(f"SVG с data-testid='{testid}' не найден")

def select_first_option_by_id(select_id: str):
    global driver
    try:
        select_container = driver.find_element(By.XPATH, f"//div[@id='{select_id}' and @tabindex='0']")
        select_container.click()
        print(f"Кликнули на селект с id '{select_id}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)

        first_option = driver.find_element(By.XPATH, "//ul[contains(@class,'MuiMenu-list')]/li[1]")
        first_option.click()
        print(f"Выбрали первый элемент из селекта с id '{select_id}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print(f"Не удалось найти селект или опцию для id '{select_id}'")

def fill_input_by_name(name: str, text: str):
    global driver
    try:
        input_field = driver.find_element(By.NAME, name)
        input_field.clear()
        input_field.send_keys(text)
        print(f"Поле '{name}' заполнено: {text}")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print(f"Поле с name='{name}' не найдено")

def login_as(role: str):
    click_button_by_text("Войти")
    fill_email_field(TEST_USER_EMAILS_BY_ROLE[role])
    fill_password_field(DEFAULT_TEST_PASSWORD)
    click_button_by_text("Войти")

def click_drawer_button():
    global driver
    try:
        drawer_button = driver.find_element(By.CSS_SELECTOR, "button[aria-label='open drawer']")
        drawer_button.click()
        print("Кликнули на кнопку открытия меню")
        time.sleep(1)
    except NoSuchElementException:
        print("Кнопка открытия меню не найдена")

def fill_email_field(email: str):
    global driver
    try:
        email_input = driver.find_element(By.NAME, "email")
        email_input.clear()
        email_input.send_keys(email)
        print(f"Поле email заполнено: {email}")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print("Поле email не найдено")

def fill_password_field(password: str):
    global driver
    try:
        password_input = driver.find_element(By.NAME, "password")
        password_input.clear()
        password_input.send_keys(password)
        print("Поле password заполнено")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print("Поле password не найдено")

def click_button_by_text(text: str):
    global driver
    try:
        button = driver.find_element(By.XPATH, f"//button[normalize-space(text())='{text}']")
        button.click()
        print(f"Кликнули на кнопку '{text}'")
        time.sleep(GENERAL_SLEEP_CONSTANT)
    except NoSuchElementException:
        print(f"Кнопка с текстом '{text}' не найдена")

def open_and_wait(url: str, wait_seconds: float = 0.5):
    global driver
    driver.get(url)
    print(f"Открыл {url}, ждем {wait_seconds} секунд...")
    time.sleep(wait_seconds)

def close_browser():
    global driver
    if driver:
        driver.quit()
        print("Браузер закрыт")
        driver = None
