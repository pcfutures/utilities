# Utilities

A collection of utilities & helpers.

### Styling

-  [Undraw](https://undraw.co/illustrations) - _MIT Licensed SVG Illustrations_
-  [Dribbble](https://dribbble.com) - _Design Inspiration_
-  [Material Design Color Tool](https://material.io/resources/color) - _UI Color Palette Generator_
-  [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - _UI Color Palette_
-  [Tailwind Shadows](https://tailwindcss.com/docs/box-shadow) - _UI Shadows_

### Documentation

- **Server-side**
	- [Laravel](https://laravel.com/docs)
	- [Carbon](https://carbon.nesbot.com/docs)
	- [Laravel Websockets Setup With Forge](https://alex.bouma.blog/posts/installing-laravel-websockets-on-forge-with-ssl/)
- **Client-side**
	- [React](https://reactjs.org/docs/hello-world.html)
	- [Moment](https://momentjs.com/docs)

### Useful Commands

- **MySQL**
	- _Dump a password-protected database to a raw .sql file_ - `mysqldump -u [username] -p [databasename] > [filename].sql`
	- _Hydrate a password-protected database with a raw .sql file_ - `mysql -u [username] -p -h localhost [databasename] < [filename].sql`

- **Linux Shell**
	- _Copy a local file to a remote destination_ - `scp [path_to_local_file] [user]@[hostname]:[path_to_remote_destination]`
	- _Copy a remote file to a local destination_ - `scp [user]@[hostname]:[path_to_remote_file] [path_to_local_destination]`

### Solutions
- **MySQL 8 Access denied for user 'root'@'localhost'**
	- `sudo systemctl stop mysql`
	- `sudo mkdir -p /var/run/mysqld`
	- `sudo chown mysql:mysql /var/run/mysqld`
	- `sudo mysqld_safe --skip-grant-tables --skip-networking &`
	- `sudo mysql`
	- `UPDATE mysql.user SET plugin='mysql_native_password' WHERE User='root';`
	- `FLUSH PRIVILEGES;`
	- `EXIT;`
	- `/etc/init.d/mysql stop`
	- `service mysql stop`
	- `sudo killall -KILL mysql mysqld_safe mysqld`
	- `/etc/init.d/mysql start`
	- `service mysql start`

