-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2020 at 11:56 AM
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
  `userid` int(11) NOT NULL,
  `restid` int(11) NOT NULL,
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
  `id` int(11) NOT NULL,
  `userid` varchar(64) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `ownerid` int(13) NOT NULL
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
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(16) DEFAULT 'customer',
  `infected` tinyint(1) DEFAULT '0',
  `at_risk` tinyint(1) NOT NULL DEFAULT '0',
  `at_risk_since` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `type`, `infected`, `at_risk`, `at_risk_since`) VALUES
('1', '12345677890', '', NULL, 0, NULL),
('2', 'test', '', NULL, 0, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
