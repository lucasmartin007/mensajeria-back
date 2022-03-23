-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2022 a las 23:32:49
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proy-mensajeria`
--

--____ACLARACION____: LOS NOMBRES DE LAS TABLAS DEBEN CAMBIARSE A MAYUSCULAS EN LA PRIMERA LETRA EN EL CASO DE USAR LINUX O MAC

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `message` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL,
  `es_archivo` tinyint(1) NOT NULL,
  `nombre_archivo` varchar(512) DEFAULT NULL,
  `cont_imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `sender`, `receiver`, `message`, `created_at`, `es_archivo`, `nombre_archivo`, `cont_imagen`) VALUES
(1, 1, 2, 'Hola', '2021-06-29 01:46:13', 0, NULL, NULL),
(2, 1, 2, 'Como estas?', '2021-06-29 01:47:15', 0, NULL, NULL),
(3, 2, 1, 'Hola. Bien, muy bien', '2021-06-29 02:44:51', 0, NULL, NULL),
(4, 1, 3, 'Hola', '2021-06-29 02:46:55', 0, NULL, NULL),
(5, 1, 3, 'Todo bien?', '2021-06-29 02:53:48', 0, NULL, NULL),
(6, 3, 1, 'Hola! Bien', '2021-06-29 02:59:30', 0, NULL, NULL),
(7, 1, 3, 'Que contas?', '2021-06-29 14:46:17', 0, NULL, NULL),
(8, 1, 2, 'Que estas haciendo?', '2021-06-29 14:46:25', 0, NULL, NULL),
(9, 2, 1, 'Nada, leo un libro. Vos?', '2021-06-29 14:55:52', 0, NULL, NULL),
(10, 3, 1, 'Nada, aca tranqui. Escuchando musica, vos?', '2021-06-29 14:56:17', 0, NULL, NULL),
(11, 1, 2, 'Viendo unos videos de Youtube', '2021-06-29 14:56:47', 0, NULL, NULL),
(12, 1, 3, 'Nada, leyendo noticias', '2021-06-29 14:57:22', 0, NULL, NULL),
(19, 1, 2, 'documento-texto.txt', '2022-03-23 21:48:56', 1, 'documento-texto.txt', NULL),
(20, 1, 2, 'Montaña00.jpg', '2022-03-23 21:49:25', 1, 'Montaña00.jpg', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL,
  `direccion_ip` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `direccion_ip`, `created_at`) VALUES
(28, '192.168.100.13', '2021-08-07 01:43:58'),
(29, '192.168.100.13', '2021-08-07 01:47:04'),
(30, '192.168.100.13', '2021-08-07 01:48:47'),
(31, '192.168.100.13', '2021-08-07 02:09:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`) VALUES
('7712f3aa-80ca-4d4f-bcd9-48c20429f302', 'agustin', 'agustin@gmail.com'),
('7e07243f-2204-46db-b257-e32554b3803d', 'brenda', 'brenda@gmail.com'),
('29b67893-f22a-429c-bc3f-9114ccf1781a', 'carlos', 'carlos@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usercredentials`
--

CREATE TABLE `usercredentials` (
  `id` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usercredentials`
--

INSERT INTO `usercredentials` (`id`, `password`, `userId`) VALUES
(9, '$2a$10$pMrQn75PcQzRswleHk6.6OepAXNHNS431RfJbJ2pWo0mf50qn9csC', '7712f3aa-80ca-4d4f-bcd9-48c20429f302'),
(0, '$2a$10$cn8E0Rc7N5LHsm9m9tDwlu6K.OBADg.ib7BJDjj5YT3hIRN0J4vYi', '7e07243f-2204-46db-b257-e32554b3803d'),
(963, '$2a$10$I55Wd7ThtVo0CpxIpfw0q.K5QMk2h.QSt5UAUnEsOYnNv2CUNEJOK', '29b67893-f22a-429c-bc3f-9114ccf1781a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'luciano', 'luciano10', 'luciano@hotmail.com', '2021-06-29 01:44:20'),
(2, 'maria', 'maria10', 'maria@yahoo.com', '2021-06-29 01:44:35'),
(3, 'nicolas', 'nicolas10', 'nicolas@gmail.com', '2021-06-29 01:44:51');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
