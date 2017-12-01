# Keyword
scaffold

Create new a migration:

```
php artisan make:migration create_users_table --create="users"
php artisan migrate
```

Rollback migration:

```
php artisan migrate:rollback
```

Alter table:

```
php artisan make:migration do_something_to_users --table="users"
php artisan migrate
```

# Safely remove migration in laravel

I accidentally created a migration with a bad name (command: php artisan migrate:make). I did not run (php artisan migrate) the migration, so I decided to remove it. My steps:

1. Manually delete the migration file under app/database/migrations/my_migration_file_name.php
2. Reset the composer autoload files: composer dump-autoload
3. Relax

If you did run the migration (php artisan migrate), you may do this:

a) Run migrate:rollback - it is the right way to undo the last migration (Thnx @Jakobud)

b) If migrate:rollback does not work, do it manually (I remember bugs with migrate:rollback in previous versions):

1. Manually delete the migration file under app/database/migrations/my_migration_file_name.php
2. Reset the composer autoload files: composer dump-autoload
3. Modify your database: Remove the last entry from the migrations table

Ref: https://stackoverflow.com/questions/16871413/safely-remove-migration-in-laravel

# Copy your migration file to a temporal folder "temp" in migrations folder, then run (paths as in L5):

```
php artisan migrate --path=database/migrations/temp
```

This way it will only run that file without messing with your current tables.

Ref: https://laravel.com/docs/5.4/migrations

Tạo seeder trong laravel:

```
php artisan make:seed seedName
```

-Tiếp đó chúng ta sẽ có hai cách chạy:

Dùng lệnh: `php artisan db:seed --class=Users`
Vào file `DatabaseSeeder.php` thêm đoạn `$this->call(Users::class);` vào hàm run (Users có thể thay đổi bằng tên file của bạn muốn thực hiện lệnh) và chúng ta lại dùng lệnh `php artisan db:seed`


Tao moi model:

```
php artisan make:model Articles
```

Ref: https://laravel.com/docs/5.4/eloquent

# Tool tuong tac voi Laravel:

```
php artisan tinker
```

# Mo hinh MVC trong laravel

Form trong laravel
- su dung service: composer require "laravelcollective/html":"^5.4.0"
Ref: https://laravelcollective.com/docs/5.4/html#installation

Date trong Laravel
- Su dung: `composer require nesbot/carbon`

Form validation
- Tao rule form validation: `php artisan make:request CheckArticlesRequest`

Cap nhat du lieu trong form
- Xem cac list cac route: php artisan route:list

# Authentication trong laravel
Tao cac auth file (controllers, models, views)
php artisan make:auth

Xoa cache sau khi thay doi file configure
php artisan config:cache

Cau hinh mail va gui mail reset password thanh cong


# Create Form Request:

```
php artisan make:request UserFormRequest
```

# Cache Trong Laravel:
- Popular cache: Memcached, Redis
- In-memory cache
- Database ==> create a cache table: `php artisan make:model Cache -m`
- Memcached: required installation: http://pecl.php.net/package/memcached
- Redis: details in https://laravel.com/docs/5.4/redis#configuration

- Create cache object: https://laravel.com/docs/5.4/contracts
- Details about cache: https://laravel.com/docs/5.4/cache

Tao cache config: `php artisan config:cache`
Xoa cache config: `php artisan config:clear`

# Pretty/Friendly URLs
- Using eloquent-sluggable (https://github.com/cviebrock/eloquent-sluggable) through composer: 
	
	`composer require cviebrock/eloquent-sluggable:^4.2`

	Adding below line into `providers` array in `config/app.php`

	Updating configuration:

	```
	php artisan config:clear
	php artisan vendor:publish
	```


