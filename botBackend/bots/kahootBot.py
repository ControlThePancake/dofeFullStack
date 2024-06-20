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
import sys


def start():
    try:
        print(len(sys.argv), flush=True)
        game_code = int(sys.argv[1])
        bot_num = int(sys.argv[2])
        name = sys.argv[3]
        sessionId = sys.argv[4]
        print(f"Game code: {game_code}, Number of bots: {bot_num}, {name}, {sessionId}", flush=True)
        runInParallel(bot_num, game_code,name, sessionId)
        sys.exit(0)  # Success
    except Exception as e:
        print(e, flush=True)
        sys.exit(1)  # Error


def play_game(game_code,name,sessionId):
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome( options=chrome_options)
    print(f"status:running,sessionId:{sessionId}", flush=True)

    try:
        driver.get("https://www.kahoot.it")
    except Exception as e:
        print(f"status:error:{str(e)},sessionId:{sessionId}", flush=True)
        sys.exit(1)

    time.sleep(2)

    try:
        pinInput = driver.find_element(By.ID, "game-input")
        time.sleep(2)
        pinInput.send_keys(game_code)  
        pinInput.send_keys(Keys.RETURN)
    except Exception as e:
        print(f"status:error:{str(e)},sessionId:{sessionId}", flush=True)
        sys.exit(1)
        

    time.sleep(2)

    try:
        nicInput = driver.find_element(By.ID, "nickname")
        nicInput.send_keys(name + str(random.randint(0,10000)))
        nicInput.send_keys(Keys.RETURN)
    except Exception as e:
        print(e)
        print(f"status:error:{str(e)},sessionId:{sessionId}", flush=True)
        sys.exit(1)
    
    while True:
        if len(driver.find_elements(By.CSS_SELECTOR, "[data-functional-selector=ranking-text]")) > 0:
            break
        
        try:
            WebDriverWait(driver, 180).until(EC.presence_of_element_located((By.CSS_SELECTOR,'[data-functional-selector="answer-0"]')))
            answer = random.choice(driver.find_elements(By.CSS_SELECTOR, "[data-functional-selector^=answer]"))
            answer.click()
            time.sleep(10)
        except Exception as e:
            print(f"status:error:{str(e)},sessionId:{sessionId}", flush=True)
            sys.exit(1)

    print(f"status:completed,session:{sessionId}", flush=True)
    driver.quit()

def runInParallel(count, game_code,name, sessionId):
    proc = []
    for i in range(0, count):
        p = Process(target=play_game, args=(game_code,name, sessionId, ))
        p.start()
        proc.append(p)
    for p in proc:
        p.join()

if __name__ == '__main__':
    start()

