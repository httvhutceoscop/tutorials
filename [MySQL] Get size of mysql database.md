It can be determined by using following MySQL command

# Get result in MB

```
SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)" FROM information_schema.TABLES GROUP BY table_schema;
```

Result

```
Database    Size (MB)
db1         11.75678253
db2         9.53125000
test        50.78547382
```

# Get result in GB

```
SELECT table_schema AS "Database", SUM(data_length + index_length) / 1024 / 1024 / 1024 AS "Size (GB)" FROM information_schema.TABLES GROUP BY table_schema;
```

# Other ways

Go into the mysql data directory and run command: 

```
du -h --max-depth=1 | grep databasename
```