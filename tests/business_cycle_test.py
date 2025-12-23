import utils as u
import time

GENERAL_SLEEP_CONSTANT = 0.5

def soldier_post_report():
    u.login_as("soldier")
    u.click_drawer_button()
    u.click_svg_by_testid("TaskIcon")
    u.click_svg_by_testid("ChevronLeftIcon")
    u.click_button_by_text("Отчитаться о выполнении")
    u.fill_input_by_name("timeSpent", "2")
    u.fill_input_by_name("description", "Всё прошло успешно !")
    u.click_button_by_text("Отправить")
    u.click_button_by_text("Завершенные мной")
    u.click_button_by_text("Посмотреть отчёт")
    u.click_button_by_text("Закрыть")
    u.click_button_by_text("Выйти")


def admin_assign_employees():
    u.login_as("admin")
    u.click_drawer_button()
    u.click_svg_by_testid("DashboardIcon")
    u.click_svg_by_testid("ChevronLeftIcon")
    u.click_button_by_text("Ожидающие назначения")
    u.click_button_by_text("Назначить солдат")
    u.click_first_option_in_select_by_id("employees_select")
    u.click_radio_by_id("main_executor_radio_first")
    u.click_button_by_text("Сохранить")
    u.click_button_by_text("Выйти")

def user_pay_order():
    u.login_as("user")
    u.click_drawer_button()
    u.click_svg_by_testid("DashboardIcon")
    u.click_svg_by_testid("ChevronLeftIcon")
    u.click_button_by_text("Ожидающие оплаты")
    u.click_button_by_text("Оплатить")
    u.click_button_by_id("payment_button")
    u.click_button_by_text("Выйти")

def admin_accept_task():
    u.login_as("admin")
    u.click_drawer_button()
    u.click_svg_by_testid("DashboardIcon")
    u.click_svg_by_testid("ChevronLeftIcon")
    u.click_button_by_text("Назначить оплату")
    u.fill_input_by_name("price", "123")
    u.click_button_by_text("Установить")
    u.click_button_by_text("Выйти")

def user_create_task_fill_info_and_logout():
    u.login_as("user")
    u.click_button_by_text("Создать заказ")
    time.sleep(GENERAL_SLEEP_CONSTANT)
    u.fill_input_by_name("address", "Улица Ленина")
    u.fill_input_by_name("description", "Приехать постоять 5 минут и уехать - 5")
    u.select_first_option_by_id("task-type-select")
    u.select_first_option_by_id("task-region-select")
    u.click_button_by_text("Создать")
    u.click_button_by_text("Выйти")

def test_scenario_task_processing():
    user_create_task_fill_info_and_logout()
    admin_accept_task()
    user_pay_order()
    admin_assign_employees()
    soldier_post_report()
