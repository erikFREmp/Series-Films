-- Roles
INSERT INTO `roles` (id, name) VALUES (1, 'USER');
INSERT INTO `roles` (id, name) VALUES (2, 'ADMIN');

-- Users (password 1234)
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (1, 'user1', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user1@example.com',"en", 100, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (2, 'user2', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user2@example.com',"es", 800, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (3, 'user3', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user3@example.com',"en", 300, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (4, 'user4', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user4@example.com',"es", 400, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (5, 'user5', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user5@example.com',"es", 500, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (6, 'user6', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user6@example.com',"es", 600, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (7, 'user7', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user7@example.com',"es", 700, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (8, 'user8', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user8@example.com',"es", 800, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (9, 'user9', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user9@example.com',"es", 900, true);
INSERT INTO `users` (id, username, password, email,language, coins, active) VALUES (10, 'user10', '$2a$10$n2WAoytGIzWl/swzvy5dN.yyeuaPEY3dp9KTlPlw7tBYcj3Hu7v6q', 'user10@example.com',"es", 1000, true);

-- -- Products
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (1, 823464, 'Godzilla x Kong: The New Empire', '/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg', true);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (2, 653346, 'Kingdom of the Planet of the Apes', '/gKkl37BQuKTanygYQG1pyYgLVgf.jpg', true);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (3, 786892, 'Furiosa: A Mad Max Saga', '/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', true);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (4, 929590, 'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.', '/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg', true);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (5, 746036, 'Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.', '/tSz1qsmSJon0rqjHBxXZmrotuse.jpg',true);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (6, 1416, 'Greys Anatomy', '/jcEl8SISNfGdlQFwLzeEtsjDvpw.jpg', false);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (7, 2734, 'Law & Order: Special Victims Unit', '/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg', false);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (8, 94722, 'Tagesschau', '/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg', false);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (9, 121, 'Doctor Who', '/xinqAmYrZ1TEwowcQhgTkZVtVE0.jpg', false);
INSERT INTO `products` (product_id, tmdb_id, title, poster_path, is_film) VALUES (10, 22980, 'Watch What Happens Live with Andy Cohen', '/onSD9UXfJwrMXWhq7UY7hGF2S1h.jpg', false);

-- -- Posts
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (1, 1, 'Godzilla es mejor que kong', '2023-01-01 00:00:00', 1, 1);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (2, 2, 'Es mejor la primera', '2023-01-02 00:00:00', 1, 2);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (3, 3, 'Pelicula recomendada. De las mejores que he visto', '2023-01-03 00:00:00', 1, 3);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (4, 4, 'Esta peli tendría que haber ganado el oscar', '2023-01-04 00:00:00', 1, 4);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (5, 5, 'El cine esta en decadencia', '2023-01-05 00:00:00', 1, 5);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (6, 6, 'Me quede dormido a la mitad', '2023-01-06 00:00:00', 1, 6);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (7, 7, 'Content of post 7', '2023-01-07 00:00:00', 7, 7);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (8, 8, 'Content of post 8', '2023-01-08 00:00:00', 8, 8);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (9, 9, 'Content of post 9', '2023-01-09 00:00:00', 9, 9);
INSERT INTO `posts` (id, local_rating, content, post_date, product_id, user_id) VALUES (10, 10, 'Content of post 10', current_timestamp(), 10, 10);

-- -- Purchase
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (2, 1, '2023-01-01');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (2, 2, '2023-01-02');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (2, 3, '2023-01-03');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (2, 4, '2023-01-04');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (2, 5, '2023-01-05');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (3, 6, '2023-01-06');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (3, 7, '2023-01-07');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (3, 8, '2023-01-08');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (3, 9, '2023-01-09');
INSERT INTO `purchases` (user_id, product_id, purchase_date) VALUES (3, 10, '2023-01-10');

-- Favorite
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (2, 1, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (2, 2, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (2, 3, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (2, 4, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (2, 5, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (3, 6, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (3, 7, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (3, 8, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (3, 9, true);
INSERT INTO `favorites` (user_id, product_id, is_favorite) VALUES (3, 10, true);

-- USER1 ADMIN
INSERT INTO `user_roles` (user_id, role_id) VALUES (1, 2);
INSERT INTO `user_roles` (user_id, role_id) VALUES (2, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (3, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (4, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (5, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (6, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (7, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (8, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (9, 1);
INSERT INTO `user_roles` (user_id, role_id) VALUES (10, 1);
