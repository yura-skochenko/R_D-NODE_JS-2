* add   --name "<текст звички>" --freq <daily|weekly|monthly> — додає звичку;
```
node index.js add --name "Вода" --freq daily
node index.js add --name "Иедитація" --freq weekly
```

* list — показує всі звички у вигляді таблиці;
```
node index.js list
```

* done  --id <ідентифікатор> — відмічає, що звичку виконано сьогодні;
```
node index.js done --id 1234
```

* stats — друкує для кожної звички відсоток виконання за останні 7(30) днів;
```
node index.js list
```

* delete --id <ідентифікатор> — видаляє звичку;
```
node index.js delete --id 1234
```

* update --id <ідентифікатор> --name "<текст звички>" --freq <daily|weekly|monthly> — вносить зміни у назву, або регулярність;
```
node index.js update --id 1234 --name "Спорт" --freq weekly
```