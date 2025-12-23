
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium import webdriver

import utils as u
from utils import GENERAL_SLEEP_CONSTANT
import business_cycle_test as bct
import ui_correctness_test as uct

def main():
    service = Service("/snap/bin/geckodriver")
    options = Options()

    u.driver = webdriver.Firefox(service=service, options=options)

    try:
        url = "http://localhost:5173"
        u.open_and_wait(url, wait_seconds=GENERAL_SLEEP_CONSTANT)
        bct.test_scenario_task_processing()
        uct.ui_correctness_test()
    finally:
        u.close_browser()

if __name__ == "__main__":
    main()
