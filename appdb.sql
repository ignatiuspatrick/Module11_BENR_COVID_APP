-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2020 at 04:05 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `id` int(11) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `restid` int(11) NOT NULL,
  `at_risk` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `checkin_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkout_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkin`
--

INSERT INTO `checkin` (`id`, `userid`, `restid`, `at_risk`, `created_at`, `checkin_time`, `checkout_time`) VALUES
(1, '7a883203-7240-4c0e-8f86-6e83793a1c47', 122, 1, '2020-10-21 11:52:54', '2020-10-20 14:14:06', '2020-10-20 14:38:57'),
(3, 'bd1a9cf7-5bdb-415f-99e4-a65cc98a7cff', 122, 1, '2020-10-21 11:53:18', '2020-10-20 15:03:59', '2020-10-20 15:04:08'),
(4, '45ab241b-b687-4577-85c1-af526bc196ce', 122, 0, '2020-10-21 11:54:13', '2020-10-20 15:34:21', '2020-10-20 15:34:08');

-- --------------------------------------------------------

--
-- Table structure for table `ggd_codes`
--

CREATE TABLE `ggd_codes` (
  `id` int(11) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ggd_codes`
--

INSERT INTO `ggd_codes` (`id`, `userid`, `code`, `created_at`) VALUES
(2, 'f9be5e76-88e3-48e1-9c87-748a8fe5c569', '8H0PHRH4', '2020-10-21 08:18:54'),
(3, '6708cd1a-d92d-4ecc-baa6-30f31761b2f1', 'WWDKEPCX', '2020-10-15 08:26:17'),
(4, '9c94a30f-5f4c-419b-8318-e17364a5fc3b', 'YMYEXDD1', '2020-10-15 08:28:21'),
(5, '144a809c-db94-49e5-b92e-de6229a6d9e2', 'U5KX4DPY', '2020-10-15 08:28:44'),
(6, '6d7f91fe-d4b9-43c1-ac84-79a0da943f9f', 'TTU4EEYE', '2020-10-15 08:28:58'),
(7, '52cc2561-4a47-4c79-8b2a-8389d04c3b7b', '5K5DUW51', '2020-10-16 07:48:41'),
(8, '0b616e07-6129-4465-aa46-082fa63e28c4', '5MW0YEX4', '2020-10-16 07:49:40'),
(9, 'e6b26a0b-155a-41a8-ba36-ab2200317564', '2MMRHUU0', '2020-10-16 13:22:53'),
(10, '5900a03c-4bd7-4999-96ce-d6265813f0ad', '1U4PWWE0', '2020-10-17 11:55:07'),
(11, '5298a595-c77b-4f5e-ace8-388534b57b6d', 'PHP0WXXW', '2020-10-17 11:55:26'),
(12, 'ddd53fd0-6235-435f-8458-64ec43bac523', 'PPM48RME', '2020-10-17 12:08:35'),
(13, 'f80a9cd1-6b9e-4944-8ebc-14997a666a08', '5P8DDKX4', '2020-10-17 12:14:43'),
(14, '5d37fdca-7769-4274-ada4-4969b7c71113', 'TTCTKK8M', '2020-10-17 12:15:17'),
(15, '8a7eac20-76c3-496c-a374-7baef4d777f4', '1PX28PRR', '2020-10-17 12:17:54'),
(16, 'd3e6be21-9c21-4b04-980f-6b3d5752ea83', '00EMH5PU', '2020-10-17 12:18:35'),
(17, '5e418220-8373-423d-9c6e-02b84f193090', '4MUHP2EM', '2020-10-17 12:19:12'),
(18, 'ab8bdcb2-227e-43a1-b7ed-97c0e958b301', 'M4CX04EE', '2020-10-17 20:39:53'),
(19, 'd343ebdd-726b-4584-ab56-dfc36dd41f9a', '25MRWP8U', '2020-10-19 14:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `streetname` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `postalcode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `ownerid` int(13) NOT NULL,
  `ToS` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `streetname`, `number`, `postalcode`, `city`, `ownerid`, `ToS`) VALUES
(1, 'Restaurant LaRoche', NULL, '', '', NULL, 0, NULL),
(2, 'De Ouwe Compagnie', NULL, '', '', NULL, 0, NULL),
(3, 'Big Belly\'s Tavern', NULL, '', '', NULL, 0, NULL),
(4, 'burgerme Enschede', NULL, '', '', NULL, 0, NULL),
(5, 'Blue Sakura', NULL, '', '', NULL, 0, NULL),
(6, 'Asaka', NULL, '', '', NULL, 0, NULL),
(7, 'Argentijns Steakhouse Grillmasters', NULL, '', '', NULL, 0, NULL),
(8, 'Steakhouse Lutscher Alm B.V.', NULL, '', '', NULL, 0, NULL),
(9, 'Dutch premium grill @Home Enschede', NULL, '', '', NULL, 0, NULL),
(10, 'De Branderie', NULL, '', '', NULL, 0, NULL),
(11, 'Ginza Sushi', NULL, '', '', NULL, 0, NULL),
(12, 'Gastrobarbijrozendaal', NULL, '', '', NULL, 0, NULL),
(13, 'Restaurant Hanninkshof', NULL, '', '', NULL, 0, NULL),
(14, 'puntoPASTA', NULL, '', '', NULL, 0, NULL),
(15, 'Lunchroom Het Rigtpunt', NULL, '', '', NULL, 0, NULL),
(16, 'Heel Bijzonder Enschede', NULL, '', '', NULL, 0, NULL),
(17, 'Goodys', NULL, '', '', NULL, 0, NULL),
(18, 'Joop\'s Broodjes', NULL, '', '', NULL, 0, NULL),
(19, 'Oh my grill', NULL, '', '', NULL, 0, NULL),
(20, 'Ana Doner V.O.F.', NULL, '', '', NULL, 0, NULL),
(21, 'Spaans Restaurant Los Sueños \"mas que tapas\" in Enschede', NULL, '', '', NULL, 0, NULL),
(22, 'Bistro Dreams Enschede', NULL, '', '', NULL, 0, NULL),
(23, 'Restaurant Haifa', NULL, '', '', NULL, 0, NULL),
(24, 'Sensazia All-in restaurant', NULL, '', '', NULL, 0, NULL),
(25, 'Kosie Restaurant', NULL, '', '', NULL, 0, NULL),
(26, 'Mazza Libanees Restaurant', NULL, '', '', NULL, 0, NULL),
(27, 'Restaurant De Tropen', NULL, '', '', NULL, 0, NULL),
(28, 'Le Mans EET-DRINK & GENIET', NULL, '', '', NULL, 0, NULL),
(29, 'Verso Cucina Italiana \'d Intenzo', NULL, '', '', NULL, 0, NULL),
(30, 'Restaurant Turquoise', NULL, '', '', NULL, 0, NULL),
(31, 'CopaCabana Steakhouse & Tapasrestaurant', NULL, '', '', NULL, 0, NULL),
(32, 'Restaurant Het Middelpunt', NULL, '', '', NULL, 0, NULL),
(33, 'Restaurant Zeytin', NULL, '', '', NULL, 0, NULL),
(34, 'De Kater', NULL, '', '', NULL, 0, NULL),
(35, 'Bistro en Wijnbar BRUUT (heropening op 17 september 2020)', NULL, '', '', NULL, 0, NULL),
(36, 'Habibi', NULL, '', '', NULL, 0, NULL),
(37, 'Oaks Gastrobar', NULL, '', '', NULL, 0, NULL),
(38, 'Ji-NOS', NULL, '', '', NULL, 0, NULL),
(39, 'Restaurant Cozy', NULL, '', '', NULL, 0, NULL),
(40, 'Sam Sam', NULL, '', '', NULL, 0, NULL),
(41, 'Eetcafé De Fusting', NULL, '', '', NULL, 0, NULL),
(42, 'Damascus restaurant', NULL, '', '', NULL, 0, NULL),
(43, 'Fabels', NULL, '', '', NULL, 0, NULL),
(44, 'Toons Snelbuffet', NULL, '', '', NULL, 0, NULL),
(45, 'Frans op den Bult | Restaurant, Hotel, Zalen - Hengelo e.o.', NULL, '', '', NULL, 0, NULL),
(46, 'Bardot Enschede', NULL, '', '', NULL, 0, NULL),
(47, 'De Pyramiden', NULL, '', '', NULL, 0, NULL),
(48, 'Turtles Pizza', NULL, '', '', NULL, 0, NULL),
(49, 'Fletcher Hotel-Restaurant De Broeierd-Enschede', NULL, '', '', NULL, 0, NULL),
(50, 'Restaurant Hisar', NULL, '', '', NULL, 0, NULL),
(51, 'Lovely Local', NULL, '', '', NULL, 0, NULL),
(52, 'Restaurant Joann', NULL, '', '', NULL, 0, NULL),
(53, 'KFC', NULL, '', '', NULL, 0, NULL),
(54, 'Het Paradijs', NULL, '', '', NULL, 0, NULL),
(55, 'Japans Restaurant TAO', NULL, '', '', NULL, 0, NULL),
(56, '\'t Lansink (Hotel - Restaurant)', NULL, '', '', NULL, 0, NULL),
(57, 'Carlina\'s Latin Cuisine', NULL, '', '', NULL, 0, NULL),
(58, 'The Saloon', NULL, '', '', NULL, 0, NULL),
(59, 'Restaurant de Basis', NULL, '', '', NULL, 0, NULL),
(60, 'Eethuis Toros', NULL, '', '', NULL, 0, NULL),
(61, 'De Eetkamer', NULL, '', '', NULL, 0, NULL),
(62, 'Foodbar BLUFF', NULL, '', '', NULL, 0, NULL),
(63, 'Thais Restaurant Aroy-D', NULL, '', '', NULL, 0, NULL),
(64, 'Hu\'s Garden', NULL, '', '', NULL, 0, NULL),
(65, 'Spice King India Enschede', NULL, '', '', NULL, 0, NULL),
(66, 'Grieks Restaurant Rhodos', NULL, '', '', NULL, 0, NULL),
(67, 'Argentijns restaurant poco mucho', NULL, '', '', NULL, 0, NULL),
(68, 'Paddy\'s', NULL, '', '', NULL, 0, NULL),
(69, 'Saray Ocakbasi', NULL, '', '', NULL, 0, NULL),
(70, 'Balkan Restaurant', NULL, '', '', NULL, 0, NULL),
(71, 'Brasserie Kachel', NULL, '', '', NULL, 0, NULL),
(72, 'Restaurant Thessaloniki', NULL, '', '', NULL, 0, NULL),
(73, 'Sapori e Ricordi', NULL, '', '', NULL, 0, NULL),
(74, 'Grand Cafe De Steeg', NULL, '', '', NULL, 0, NULL),
(75, 'Van der Valk Hotel Enschede', NULL, '', '', NULL, 0, NULL),
(76, 'Sorrentino', NULL, '', '', NULL, 0, NULL),
(77, 'Fellini Enschede', NULL, '', '', NULL, 0, NULL),
(78, 'Nyonya Meneer Indonesisch Eethuis', NULL, '', '', NULL, 0, NULL),
(79, 'Snackkar aan huis \"Tukker food\" betrouwbaar en betaalbaar', NULL, '', '', NULL, 0, NULL),
(80, 'Restaurant de Oude Apotheek', NULL, '', '', NULL, 0, NULL),
(81, 'Humphrey\'s Restaurant Enschede', NULL, '', '', NULL, 0, NULL),
(82, 'Los Ponchos', NULL, '', '', NULL, 0, NULL),
(83, 'Yuzu Enschede', NULL, '', '', NULL, 0, NULL),
(84, 'Masada', NULL, '', '', NULL, 0, NULL),
(85, 'Steakhouse El Gaucho', NULL, '', '', NULL, 0, NULL),
(86, 'Eetcafé Bij Flip', NULL, '', '', NULL, 0, NULL),
(87, 'Vaperansa\'s Soul Food', NULL, '', '', NULL, 0, NULL),
(88, 'Moeke Enschede', NULL, '', '', NULL, 0, NULL),
(89, 'Restaurant & Grand Café The Gallery Enschede', NULL, '', '', NULL, 0, NULL),
(90, 'Cafetaria Sylvia', NULL, '', '', NULL, 0, NULL),
(91, 'Van Doorn en Doorn', NULL, '', '', NULL, 0, NULL),
(92, 'Pinto Thai', NULL, '', '', NULL, 0, NULL),
(93, 'Light of India', NULL, '', '', NULL, 0, NULL),
(94, 'Happy Italy', NULL, '', '', NULL, 0, NULL),
(95, 'De Pauw', NULL, '', '', NULL, 0, NULL),
(96, 'Bistro C\'est Si Bon', NULL, '', '', NULL, 0, NULL),
(97, 'Mario\'s en Mario\'s Sweets', NULL, '', '', NULL, 0, NULL),
(98, 'Eetcafe ’t Raedthuys', NULL, '', '', NULL, 0, NULL),
(99, 'Restaurant De Stadsgracht', NULL, '', '', NULL, 0, NULL),
(100, 'Restaurant ZIN', NULL, '', '', NULL, 0, NULL),
(101, 'Van der Poel', NULL, '', '', NULL, 0, NULL),
(102, 'The green room', NULL, '', '', NULL, 0, NULL),
(103, 'Olympic', NULL, '', '', NULL, 0, NULL),
(104, 'Bagels & Beans', NULL, '', '', NULL, 0, NULL),
(105, 'Pulcinella B.V.', NULL, '', '', NULL, 0, NULL),
(106, 'Rosy\'s', NULL, '', '', NULL, 0, NULL),
(107, 'Twentse Bierbrouwerij', NULL, '', '', NULL, 0, NULL),
(108, 'De Lunchkamer', NULL, '', '', NULL, 0, NULL),
(109, 'Kleinsman Eten en Drinken', NULL, '', '', NULL, 0, NULL),
(110, 'Chinese Restaurant International', NULL, '', '', NULL, 0, NULL),
(111, 'Restaurant Shalom - The Ribman', NULL, '', '', NULL, 0, NULL),
(112, 'Broasted Chicken', NULL, '', '', NULL, 0, NULL),
(113, 'Stravinsky eten · drinken · slapen', NULL, '', '', NULL, 0, NULL),
(114, 'Tentje Teman²', NULL, '', '', NULL, 0, NULL),
(115, 'HAOHAO', NULL, '', '', NULL, 0, NULL),
(116, 'Stichting Kookklup Lekker Eten', NULL, '', '', NULL, 0, NULL),
(117, 'Restaurant De Broeierd', NULL, '', '', NULL, 0, NULL),
(118, 'JAMe Food Enschede', NULL, '', '', NULL, 0, NULL),
(119, 'Restaurant Fleur De Sel', NULL, '', '', NULL, 0, NULL),
(120, 'Shivani\'s Surinaams Eethuis', NULL, '', '', NULL, 0, NULL),
(121, 'The Bombay Spice', NULL, '', '', NULL, 0, NULL),
(122, 'La Place', 'Deurningestraat', '215', '7511LL', 'Enschede', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_codes`
--

CREATE TABLE `restaurant_codes` (
  `id` int(11) NOT NULL,
  `restid` int(11) NOT NULL,
  `code` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant_codes`
--

INSERT INTO `restaurant_codes` (`id`, `restid`, `code`) VALUES
(1, 122, '164c317d23492918'),
(2, 124, 'cded195aaa2fcfcb');

-- --------------------------------------------------------

--
-- Table structure for table `superusers`
--

CREATE TABLE `superusers` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `infected` tinyint(1) NOT NULL DEFAULT '0',
  `infected_since` datetime DEFAULT CURRENT_TIMESTAMP,
  `at_risk` tinyint(1) NOT NULL DEFAULT '0',
  `at_risk_since` datetime DEFAULT CURRENT_TIMESTAMP,
  `notification_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `infected`, `infected_since`, `at_risk`, `at_risk_since`, `notification_token`) VALUES
('7a883203-7240-4c0e-8f86-6e83793a1c47', 1, NULL, 1, '2020-10-20 15:03:21', NULL),
('bd1a9cf7-5bdb-415f-99e4-a65cc98a7cff', 1, NULL, 1, '2020-10-20 14:41:21', NULL),
('f9be5e76-88e3-48e1-9c87-748a8fe5c569', 1, NULL, 0, '2020-10-21 14:35:14', NULL),
('fb2fad91-0e74-47a8-b972-93348684dfd1', 0, NULL, 0, NULL, NULL);

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
  ADD UNIQUE KEY `code` (`code`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ggd_codes`
--
ALTER TABLE `ggd_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `restaurant_codes`
--
ALTER TABLE `restaurant_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `superusers`
--
ALTER TABLE `superusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
