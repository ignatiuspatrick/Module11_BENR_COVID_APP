-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2020 at 07:18 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

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
  `userid` int(11) NOT NULL,
  `restid` int(11) NOT NULL,
  `at_risk` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `checkin_time` datetime NOT NULL,
  `checkout_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkin`
--

INSERT INTO `checkin` (`id`, `userid`, `restid`, `at_risk`, `created_at`, `checkin_time`, `checkout_time`) VALUES
(1, 445, 1, 0, '2020-10-14 12:36:21', '2020-10-14 14:36:21', NULL),
(2, 445, 3, 0, '2020-10-14 12:39:05', '2020-10-14 14:39:05', NULL),
(3, 445, 1, 0, '2020-10-14 15:21:45', '2020-10-14 17:21:45', '0000-00-00 00:00:00'),
(4, 445, 1, 0, '2020-10-14 15:23:12', '2020-10-14 17:23:12', '0000-00-00 00:00:00'),
(5, 445, 1, 0, '2020-10-14 16:05:29', '2020-10-14 18:05:29', '2020-10-14 00:30:00'),
(6, 445, 1, 0, '2020-10-14 16:47:32', '0000-00-00 00:00:00', '2020-10-14 18:47:32'),
(7, 445, 1, 0, '2020-10-14 16:51:32', '2020-10-14 18:51:32', '0000-00-00 00:00:00'),
(8, 445, 1, 0, '2020-10-14 16:55:08', '2020-10-14 18:55:08', '0000-00-00 00:00:00'),
(9, 445, 1, 0, '2020-10-14 16:55:50', '2020-10-14 18:55:50', '0000-00-00 00:00:00'),
(10, 445, 1, 0, '2020-10-14 16:56:45', '2020-10-14 18:56:45', '0000-00-00 00:00:00'),
(11, 445, 1, 0, '2020-10-14 16:57:35', '2020-10-14 18:57:35', '0000-00-00 00:00:00'),
(12, 445, 1, 0, '2020-10-14 17:14:21', '2020-10-14 19:14:21', '0000-00-00 00:00:00'),
(13, 445, 1, 0, '2020-10-14 17:15:42', '2020-10-14 19:15:42', '2020-10-14 19:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `ggd_codes`
--

CREATE TABLE `ggd_codes` (
  `id` int(11) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_codes`
--

CREATE TABLE `personnel_codes` (
  `id` int(11) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Restaurant LaRoche', NULL, '', '', NULL, 0, '00:30:00'),
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
(122, 'La Place', NULL, '', '', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_codes`
--

CREATE TABLE `restaurant_codes` (
  `id` int(11) NOT NULL,
  `restid` int(11) NOT NULL,
  `code` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superusers`
--

CREATE TABLE `superusers` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(16) DEFAULT 'customer',
  `infected` tinyint(1) DEFAULT 0,
  `at_risk` tinyint(1) NOT NULL DEFAULT 0,
  `at_risk_since` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `type`, `infected`, `at_risk`, `at_risk_since`) VALUES
('1', '12345677890', '', NULL, 0, NULL),
('2', 'test', '', NULL, 0, NULL),
('27febd84-cc0b-4563-8832-5e1ee73ac0c1', NULL, 'customer', 0, 0, NULL),
('445b8ae1-88a1-4340-bfef-cc7c1b85b55b', NULL, 'customer', 0, 0, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `superusers`
--
ALTER TABLE `superusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
