-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2020 at 09:52 AM
-- Server version: 8.0.21-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkin`
--

CREATE TABLE `checkin` (
  `id` int NOT NULL,
  `userid` int NOT NULL,
  `restid` int NOT NULL,
  `at_risk` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `checkin_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkout_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ggd_codes`
--

CREATE TABLE `ggd_codes` (
  `id` int NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ggd_codes`
--

INSERT INTO `ggd_codes` (`id`, `userid`, `code`, `created_at`) VALUES
(1, 'f9be5e76-88e3-48e1-9c87-748a8fe5c569', '8H0PHRH4', '2020-10-15 10:18:54'),
(2, '6708cd1a-d92d-4ecc-baa6-30f31761b2f1', 'WWDKEPCX', '2020-10-15 10:26:17'),
(3, '9c94a30f-5f4c-419b-8318-e17364a5fc3b', 'YMYEXDD1', '2020-10-15 10:28:21'),
(4, '144a809c-db94-49e5-b92e-de6229a6d9e2', 'U5KX4DPY', '2020-10-15 10:28:44'),
(5, '6d7f91fe-d4b9-43c1-ac84-79a0da943f9f', 'TTU4EEYE', '2020-10-15 10:28:58'),
(6, '52cc2561-4a47-4c79-8b2a-8389d04c3b7b', '5K5DUW51', '2020-10-16 09:48:41'),
(7, '0b616e07-6129-4465-aa46-082fa63e28c4', '5MW0YEX4', '2020-10-16 09:49:40'),
(8, 'e6b26a0b-155a-41a8-ba36-ab2200317564', '2MMRHUU0', '2020-10-16 15:22:53'),
(9, '5900a03c-4bd7-4999-96ce-d6265813f0ad', '1U4PWWE0', '2020-10-17 13:55:07'),
(10, '5298a595-c77b-4f5e-ace8-388534b57b6d', 'PHP0WXXW', '2020-10-17 13:55:26'),
(11, 'ddd53fd0-6235-435f-8458-64ec43bac523', 'PPM48RME', '2020-10-17 14:08:35'),
(12, 'f80a9cd1-6b9e-4944-8ebc-14997a666a08', '5P8DDKX4', '2020-10-17 14:14:43'),
(13, '5d37fdca-7769-4274-ada4-4969b7c71113', 'TTCTKK8M', '2020-10-17 14:15:17'),
(14, '8a7eac20-76c3-496c-a374-7baef4d777f4', '1PX28PRR', '2020-10-17 14:17:54'),
(15, 'd3e6be21-9c21-4b04-980f-6b3d5752ea83', '00EMH5PU', '2020-10-17 14:18:35'),
(16, '5e418220-8373-423d-9c6e-02b84f193090', '4MUHP2EM', '2020-10-17 14:19:12'),
(17, 'ab8bdcb2-227e-43a1-b7ed-97c0e958b301', 'M4CX04EE', '2020-10-17 22:39:53'),
(18, 'd343ebdd-726b-4584-ab56-dfc36dd41f9a', '25MRWP8U', '2020-10-19 16:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `personnel_codes`
--

CREATE TABLE `personnel_codes` (
  `id` int NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `streetname` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `postalcode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `ownerid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `streetname`, `number`, `postalcode`, `city`, `ownerid`) VALUES
(1, 'Restaurant LaRoche', NULL, '', '', NULL, 0),
(2, 'De Ouwe Compagnie', NULL, '', '', NULL, 0),
(3, 'Big Belly\'s Tavern', NULL, '', '', NULL, 0),
(4, 'burgerme Enschede', NULL, '', '', NULL, 0),
(5, 'Blue Sakura', NULL, '', '', NULL, 0),
(6, 'Asaka', NULL, '', '', NULL, 0),
(7, 'Argentijns Steakhouse Grillmasters', NULL, '', '', NULL, 0),
(8, 'Steakhouse Lutscher Alm B.V.', NULL, '', '', NULL, 0),
(9, 'Dutch premium grill @Home Enschede', NULL, '', '', NULL, 0),
(10, 'De Branderie', NULL, '', '', NULL, 0),
(11, 'Ginza Sushi', NULL, '', '', NULL, 0),
(12, 'Gastrobarbijrozendaal', NULL, '', '', NULL, 0),
(13, 'Restaurant Hanninkshof', NULL, '', '', NULL, 0),
(14, 'puntoPASTA', NULL, '', '', NULL, 0),
(15, 'Lunchroom Het Rigtpunt', NULL, '', '', NULL, 0),
(16, 'Heel Bijzonder Enschede', NULL, '', '', NULL, 0),
(17, 'Goodys', NULL, '', '', NULL, 0),
(18, 'Joop\'s Broodjes', NULL, '', '', NULL, 0),
(19, 'Oh my grill', NULL, '', '', NULL, 0),
(20, 'Ana Doner V.O.F.', NULL, '', '', NULL, 0),
(21, 'Spaans Restaurant Los Sueños \"mas que tapas\" in Enschede', NULL, '', '', NULL, 0),
(22, 'Bistro Dreams Enschede', NULL, '', '', NULL, 0),
(23, 'Restaurant Haifa', NULL, '', '', NULL, 0),
(24, 'Sensazia All-in restaurant', NULL, '', '', NULL, 0),
(25, 'Kosie Restaurant', NULL, '', '', NULL, 0),
(26, 'Mazza Libanees Restaurant', NULL, '', '', NULL, 0),
(27, 'Restaurant De Tropen', NULL, '', '', NULL, 0),
(28, 'Le Mans EET-DRINK & GENIET', NULL, '', '', NULL, 0),
(29, 'Verso Cucina Italiana \'d Intenzo', NULL, '', '', NULL, 0),
(30, 'Restaurant Turquoise', NULL, '', '', NULL, 0),
(31, 'CopaCabana Steakhouse & Tapasrestaurant', NULL, '', '', NULL, 0),
(32, 'Restaurant Het Middelpunt', NULL, '', '', NULL, 0),
(33, 'Restaurant Zeytin', NULL, '', '', NULL, 0),
(34, 'De Kater', NULL, '', '', NULL, 0),
(35, 'Bistro en Wijnbar BRUUT (heropening op 17 september 2020)', NULL, '', '', NULL, 0),
(36, 'Habibi', NULL, '', '', NULL, 0),
(37, 'Oaks Gastrobar', NULL, '', '', NULL, 0),
(38, 'Ji-NOS', NULL, '', '', NULL, 0),
(39, 'Restaurant Cozy', NULL, '', '', NULL, 0),
(40, 'Sam Sam', NULL, '', '', NULL, 0),
(41, 'Eetcafé De Fusting', NULL, '', '', NULL, 0),
(42, 'Damascus restaurant', NULL, '', '', NULL, 0),
(43, 'Fabels', NULL, '', '', NULL, 0),
(44, 'Toons Snelbuffet', NULL, '', '', NULL, 0),
(45, 'Frans op den Bult | Restaurant, Hotel, Zalen - Hengelo e.o.', NULL, '', '', NULL, 0),
(46, 'Bardot Enschede', NULL, '', '', NULL, 0),
(47, 'De Pyramiden', NULL, '', '', NULL, 0),
(48, 'Turtles Pizza', NULL, '', '', NULL, 0),
(49, 'Fletcher Hotel-Restaurant De Broeierd-Enschede', NULL, '', '', NULL, 0),
(50, 'Restaurant Hisar', NULL, '', '', NULL, 0),
(51, 'Lovely Local', NULL, '', '', NULL, 0),
(52, 'Restaurant Joann', NULL, '', '', NULL, 0),
(53, 'KFC', NULL, '', '', NULL, 0),
(54, 'Het Paradijs', NULL, '', '', NULL, 0),
(55, 'Japans Restaurant TAO', NULL, '', '', NULL, 0),
(56, '\'t Lansink (Hotel - Restaurant)', NULL, '', '', NULL, 0),
(57, 'Carlina\'s Latin Cuisine', NULL, '', '', NULL, 0),
(58, 'The Saloon', NULL, '', '', NULL, 0),
(59, 'Restaurant de Basis', NULL, '', '', NULL, 0),
(60, 'Eethuis Toros', NULL, '', '', NULL, 0),
(61, 'De Eetkamer', NULL, '', '', NULL, 0),
(62, 'Foodbar BLUFF', NULL, '', '', NULL, 0),
(63, 'Thais Restaurant Aroy-D', NULL, '', '', NULL, 0),
(64, 'Hu\'s Garden', NULL, '', '', NULL, 0),
(65, 'Spice King India Enschede', NULL, '', '', NULL, 0),
(66, 'Grieks Restaurant Rhodos', NULL, '', '', NULL, 0),
(67, 'Argentijns restaurant poco mucho', NULL, '', '', NULL, 0),
(68, 'Paddy\'s', NULL, '', '', NULL, 0),
(69, 'Saray Ocakbasi', NULL, '', '', NULL, 0),
(70, 'Balkan Restaurant', NULL, '', '', NULL, 0),
(71, 'Brasserie Kachel', NULL, '', '', NULL, 0),
(72, 'Restaurant Thessaloniki', NULL, '', '', NULL, 0),
(73, 'Sapori e Ricordi', NULL, '', '', NULL, 0),
(74, 'Grand Cafe De Steeg', NULL, '', '', NULL, 0),
(75, 'Van der Valk Hotel Enschede', NULL, '', '', NULL, 0),
(76, 'Sorrentino', NULL, '', '', NULL, 0),
(77, 'Fellini Enschede', NULL, '', '', NULL, 0),
(78, 'Nyonya Meneer Indonesisch Eethuis', NULL, '', '', NULL, 0),
(79, 'Snackkar aan huis \"Tukker food\" betrouwbaar en betaalbaar', NULL, '', '', NULL, 0),
(80, 'Restaurant de Oude Apotheek', NULL, '', '', NULL, 0),
(81, 'Humphrey\'s Restaurant Enschede', NULL, '', '', NULL, 0),
(82, 'Los Ponchos', NULL, '', '', NULL, 0),
(83, 'Yuzu Enschede', NULL, '', '', NULL, 0),
(84, 'Masada', NULL, '', '', NULL, 0),
(85, 'Steakhouse El Gaucho', NULL, '', '', NULL, 0),
(86, 'Eetcafé Bij Flip', NULL, '', '', NULL, 0),
(87, 'Vaperansa\'s Soul Food', NULL, '', '', NULL, 0),
(88, 'Moeke Enschede', NULL, '', '', NULL, 0),
(89, 'Restaurant & Grand Café The Gallery Enschede', NULL, '', '', NULL, 0),
(90, 'Cafetaria Sylvia', NULL, '', '', NULL, 0),
(91, 'Van Doorn en Doorn', NULL, '', '', NULL, 0),
(92, 'Pinto Thai', NULL, '', '', NULL, 0),
(93, 'Light of India', NULL, '', '', NULL, 0),
(94, 'Happy Italy', NULL, '', '', NULL, 0),
(95, 'De Pauw', NULL, '', '', NULL, 0),
(96, 'Bistro C\'est Si Bon', NULL, '', '', NULL, 0),
(97, 'Mario\'s en Mario\'s Sweets', NULL, '', '', NULL, 0),
(98, 'Eetcafe ’t Raedthuys', NULL, '', '', NULL, 0),
(99, 'Restaurant De Stadsgracht', NULL, '', '', NULL, 0),
(100, 'Restaurant ZIN', NULL, '', '', NULL, 0),
(101, 'Van der Poel', NULL, '', '', NULL, 0),
(102, 'The green room', NULL, '', '', NULL, 0),
(103, 'Olympic', NULL, '', '', NULL, 0),
(104, 'Bagels & Beans', NULL, '', '', NULL, 0),
(105, 'Pulcinella B.V.', NULL, '', '', NULL, 0),
(106, 'Rosy\'s', NULL, '', '', NULL, 0),
(107, 'Twentse Bierbrouwerij', NULL, '', '', NULL, 0),
(108, 'De Lunchkamer', NULL, '', '', NULL, 0),
(109, 'Kleinsman Eten en Drinken', NULL, '', '', NULL, 0),
(110, 'Chinese Restaurant International', NULL, '', '', NULL, 0),
(111, 'Restaurant Shalom - The Ribman', NULL, '', '', NULL, 0),
(112, 'Broasted Chicken', NULL, '', '', NULL, 0),
(113, 'Stravinsky eten · drinken · slapen', NULL, '', '', NULL, 0),
(114, 'Tentje Teman²', NULL, '', '', NULL, 0),
(115, 'HAOHAO', NULL, '', '', NULL, 0),
(116, 'Stichting Kookklup Lekker Eten', NULL, '', '', NULL, 0),
(117, 'Restaurant De Broeierd', NULL, '', '', NULL, 0),
(118, 'JAMe Food Enschede', NULL, '', '', NULL, 0),
(119, 'Restaurant Fleur De Sel', NULL, '', '', NULL, 0),
(120, 'Shivani\'s Surinaams Eethuis', NULL, '', '', NULL, 0),
(121, 'The Bombay Spice', NULL, '', '', NULL, 0),
(122, 'La Place', NULL, '', '', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_codes`
--

CREATE TABLE `restaurant_codes` (
  `id` int NOT NULL,
  `restid` int NOT NULL,
  `code` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superusers`
--

CREATE TABLE `superusers` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `superusers`
--

INSERT INTO `superusers` (`id`, `username`, `password`, `email`, `type`, `created_at`) VALUES
(1, 'admin', '$2b$12$qb5yieQuDXEgh3LTswyn.e5QujXrFYBaQdqoV5twzU8yZF5S6dsyu', NULL, 'restaurant_owner', '2020-09-30 19:36:23'),
(6, 'admin', '$2b$12$LtJv1DokEO/CChiIeBLCLe2.mL43TCqAm4Mc5Kp1oW/SYKprVK5HG', NULL, 'sanitary_service', '2020-10-07 16:36:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(16) DEFAULT 'customer',
  `infected` tinyint(1) DEFAULT '0',
  `at_risk` tinyint(1) NOT NULL DEFAULT '0',
  `at_risk_since` datetime DEFAULT NULL,
  `notification_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `type`, `infected`, `at_risk`, `at_risk_since`, `notification_token`) VALUES
('bd1a9cf7-5bdb-415f-99e4-a65cc98a7cff', NULL, NULL, 0, 0, NULL, NULL),
('45ab241b-b687-4577-85c1-af526bc196ce', NULL, NULL, 0, 0, NULL, NULL),
('7a883203-7240-4c0e-8f86-6e83793a1c47', NULL, 'alien', 0, 0, NULL, NULL),
('fb2fad91-0e74-47a8-b972-93348684dfd1', NULL, NULL, 0, 0, NULL, 'alien');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkin`
--
ALTER TABLE `checkin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ggd_codes`
--
ALTER TABLE `ggd_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`) USING BTREE;

--
-- Indexes for table `personnel_codes`
--
ALTER TABLE `personnel_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant_codes`
--
ALTER TABLE `restaurant_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `superusers`
--
ALTER TABLE `superusers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ggd_codes`
--
ALTER TABLE `ggd_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `personnel_codes`
--
ALTER TABLE `personnel_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `restaurant_codes`
--
ALTER TABLE `restaurant_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `superusers`
--
ALTER TABLE `superusers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
