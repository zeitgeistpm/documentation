# Як стати Колатором на Battery Station

## Запустити ноду в режимі "Collator"

### Завантажити та налаштувати середовище ноди

1. Використовуйте наступний командний рядок щоб отримати останній бінарний файл ноди Zeitgeist.

   ```
   curl -o zeitgeist https://github.com/zeitgeistpm/zeitgeist/releases/download/v0.3.2/zeitgeist_parachain
   chmod +x zeitgeist
   ```

1. Зареєструйте non-privileged користувача для запуску ноди Zeitgeist . Docker не рекомендується, тому що використовується неоптимальна продуктивність.

   ```
   sudo useradd -M -r -s /sbin/nologin zeitgeist
   ```

1. Скопіюйте бінарний файл ноди до вказаної теки.

   ```
   sudo mkdir -p /services/zeitgeist/bin
   sudo cp /path/to/your/target/release/zeitgeist /services/zeitgeist/bin
   sudo chown -R zeitgeist:zeitgeist /services/zeitgeist
   sudo chmod -R go=-rwx /services/zeitgeist
   ```

1. Створення нового сервісу.

   ```
   sudo nano /etc/systemd/system/zeitgeist-node.service
   ```

1. Налаштуйте відповідну інформацію у файлі.

   ```
   [Unit]
   Description=Zeitgeist Battery Station parachain full node
   After=network.target
   Requires=network.target

   [Service]
   Type=simple
   User=zeitgeist
   Group=zeitgeist
   RestartSec=5
   Restart=always
   Nice=0
   ExecStart=/services/zeitgeist/bin/zeitgeist \
       --base-path=/services/zeitgeist/battery_station \
       --chain=battery_station \
       --name-=zeitgeist-whisker \
       --port=30333 \
       --rpc-port=9933 \
   ```

1. Увімкніть та запустіть сервіс.

   ```
   sudo systemctl enable zeitgeist-node
   sudo systemctl start zeitgeist-node
   ```

1. Перевірте стан сервісу:

   `systemctl status zeitgeist-node`

1. Для перегляду журналу сервісу.

   `journalctl -u zeitgeist-node`
