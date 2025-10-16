# Инструкция для запуска приложения.

### Запуск приложения.
Запуск приложения осуществляется одной командой из корневой дирректории проекта:
```bash
docker compose up
```
### Необходимые настройки:
1. В корневой директории проекта создать файл credentials.json с конфигурацией
API для подключения к google-таблицам (простая аутентификация):
```
{
  "type": "service_account",
  "project_id": "wb-table-475107",
  "private_key_id": "aef67e127c4327f33e27f5e0faf7вa12598d36d4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7A+NhDd5zDBao\nhhnGuGskGkIa2TzYULQvEYxE4IZtLaykn5xknTKLNO8Ci41BLCDSyCUBSZNtm8NS\n2ZohUxyFqWm4HmD4sDJV2vsX8/+gIKJK41Y0nNGBHqJsSkk6GZfKmjw0pFHPxj3y\ny1cIKR8RFOBQ1e35tbF27fnYCj9psVapi5g6javzEbLG9OU+kd+auLA0hF25VWbV\n0u7dunkqfb6gn+TC6lm3ZH/yMdr+Q5poQeOWNYfFdiu2qQRejT19MZpnd+ZBa5Zd\nMввввeVELIaHYQuicJHo7f+E+zczFKzZDQt/EMySTkhOgHqSfIBHPL96bNi0FHbX\nWBqNbYmtAgMBAAECggEAB9UlsKVs49hQRKD6iGT7RnOmbCByw26R4Ad19AE2sBuX\nHP1QXAhsxawjDIdoFErdrxD8jR1rRCPKHk4Ifg0l5yqNcngsleMvSy2U5vpsV4+2\nVw5GyIT+40+zUXdvsglrXuwZycH4vovY1rKR2RYme8fU40h/zehrCoZKDgnT1msp\neSuhrmKztIW5RzuWJtbRrLKDVcxUI0PfGenPHLTvlOy4ZEFygUArhiPFXIVgzbDz\n1FSGHhPW0RymrN4H38enZZ5SLKkuE4M5gAIZ0FtvSr+bvgvLJvrmHdCabKb0XG5K\nQaE4y1ABjeh99rLNPjH4d0UdkYrjO8jAsG9XWfyHQwKBgQDpRsnwjbLB8wcoFaZc\nNDCeMGGrYAV0kpIL3VaVzMB5M3sXKTIbZhKJeKC+xcp3w2yb1QJvTFgI94l2JM3B\nkcJPzwPCxYzqEF0R355KaM9DIV34bGSb13BZrMRw+M3JkK853DMGGEuvC68M4ToQ\nokwISfUyP7HoM3R3eLC2nPnr0wKBgQDNO3tMrU0gIsIjozh9GAfT23RJLj/Ginqy\nrSqJHMkp5qkeyYibfQThzAUSZYXHFI+wx8kymqs4HPx5vOEtJheniM4/kFHZ4gBL\nFD3A6DhaJgSucFY3ys8+9hlWWLC288W+mlleGCZTnNiaTrCqOuAmy1frXelEWSTD\nrW4JPQzEfwKBgHTB650tLwWIQFK901BfBt6GVLxUCSb5nYO2uvmrS8LeE4PaKKwy\nAKEx8TLLCLW86IVurhNK4N1MGE87yIhUDi+n67f27LrSieLCTBXuM57j+oa2qfye\nbitUH9ZzkXyLoEiTgC5Sxr7MWEdYC5n7wZZ8fe8yljckWezaSYh9NVHlAoGBAJPL\n7jN96jjmTyES/i84CwsK02eQIuV7/HiINEWhsUy3i7tcL0Cqe8WQA2cILZr8t637\ncm067WrvlPKmjxLQh+BiqQUljYx3MPbgkMhHc62YC28D/1MWfsE8wWppXHmkfBeT\nWCBnC9LS9TnKyXcOBzZo4dviOYa7G7q/PqrwiC1JAoGALdbHtbInOtRTJHqFU9TK\nA8C7Qf93tAEMJ2MAoh8bO55/aTC+T6B7woZFyz9fmZz4T8Re10+TrT6ytnYpDRVN\nfw4dNSpQhCp8ckplS0x8tntSUw48NVbBAuf/i6y6Ec29ar2GTk3OCwQyxWjsViAi\nO53V7V0zoRvGdfbZigTTDBI=\n-----END PRIVATE KEY-----\n",
  "client_email": "wb-sevice@wb-table-475107.iam.dserviceaccount.com",
  "client_id": "109367239237863445976",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/wb-sevice%40wb-table-475107.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```
2. В файле ./.env прописать значения следующих переменных окружения:
```
POSTGRES_PORT=5432 - порт для подлючения к БД
POSTGRES_DB=postgres - название БД
POSTGRES_USER=postgres - имя пользователя для подключения к БД
POSTGRES_PASSWORD="postgres" - пароль для подключения к БД

APP_PORT=5000 - порт для контейнеров
API_KEY="eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwNTIwdjEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc2NTY3MDIyOSwiaWQiOiIwMTk3NmU0Yy1mZTgwLTc1NDAtODkyMi02NGE5ZWUzYTU4MzYiLCJpaWQiOjQ1OTExNjA5LCJvaWQiOjExMzA0NiwicyI6MTA3Mzc0MTgzMiwic2lkIjoiOTMyYzE3NmEtNTA4NS01YzZmLWJjMzMtNGU4NGNkZjU4ZDdlIiwidCI6ZmFsc2UsInVpZCI6NDU5MTE2MDl9.wDoH8FLdZu1049uPCmhx3UHaw28YJB-CylWeD2LgkpRZFIMlOsUlnlVmfmYKy__JWNjddDkOtdJ69QpSD5EKag" - ключ API для подключения к googe-таблицам
SPREADSHEETIDS="1c3j07Plf1gwg7HM1VhuzJI8nhZRvSrpitPoiOhz4ntc, 1AmbiywtKcwuOc0fNVl1l9cUtWMezOM2wwUgohdalKdo" - ID таблиц, прописываются в формате отной строки через запятую.
```
3. Также необходимо в таблицах предварительно заполнить шапку в полях A1:L1 следующего содержания:
```
"Дата"	"Регион"	"Склад"	"Цена хранения за первый литр"	"Коэффициент cклада"	"Цена хранения за доп. литр"	"Цена логистики за первый литр"	"Коэффициент логистики"	"Цена логистики за доп. литр"	"Цена логистики (FBS) за первый литр"	"Коэффициент логистики (FBS)"	"Цена логистики (FBS) за доп. литр"
```
4. Далее:
```
bash> docker compose up
```




