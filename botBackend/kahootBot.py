from os import close 
import selenium
from selenium import webdriver
from multiprocessing import Process

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import random


def start():
    game_code = int(input("Enter game code: ")) 
    bot_num = int(input("Enter the amount of bots: "))   
    print(game_code, bot_num)
    runInParallel(bot_num, game_code)
    return "successfulInit"


def play_game(game_code):
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome( options=chrome_options)

    try:
        driver.get("https://www.kahoot.it")
    except Exception as e:
        print(e)
        print("Kahoot connection failed")
        return "no Connection"
        exit()

    time.sleep(2)

    try:
        pinInput = driver.find_element(By.ID, "game-input")
        time.sleep(2)
        pinInput.send_keys(game_code)  
        pinInput.send_keys(Keys.RETURN)
    except Exception as e:
        print(e)
        print("Game Input Failed to send")
        return "failed gameInput"
        exit()

    time.sleep(2)

    try:
        nicInput = driver.find_element(By.ID, "nickname")
        nicInput.send_keys("test" + str(random.randint(0,10000)))
        nicInput.send_keys(Keys.RETURN)
    except Exception as e:
        print(e)
        print("Failed to send name")
        return "failed nameInput"
        exit()
    
    while True:
        if len(driver.find_elements(By.CSS_SELECTOR, "[data-functional-selector=ranking-text]")) > 0:
            break
        try:
            WebDriverWait(driver, 120).until(EC.presence_of_element_located((By.CSS_SELECTOR,'[data-functional-selector="answer-0"]')))
            answer = random.choice(driver.find_elements(By.CSS_SELECTOR, "[data-functional-selector^=answer]"))
            answer.click()
            time.sleep(10)
        except Exception as e:
            print(e)
            print("Failed to answer or timeout")
            print("no Answer")
            exit()

    driver.quit()

def runInParallel(count, game_code):
    proc = []
    for i in range(0, count):
        p = Process(target=play_game, args=(game_code,))
        p.start()
        proc.append(p)
    for p in proc:
        p.join()

if __name__ == '__main__':
    start()