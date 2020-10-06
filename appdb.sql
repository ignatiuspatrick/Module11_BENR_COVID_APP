-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2020 at 01:37 PM
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
  `userid` varchar(64) NOT NULL,
  `restid` int(11) NOT NULL,
  `at_risk` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `checkin_time` datetime NOT NULL DEFAULT current_timestamp(),
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `ownerid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `ownerid`, `name`, `location`, `contact`) VALUES
(1, 1, 'Restaurant LaRoche', 'Hengelosestraat 200, 7521 AL Enschede', 'restaurantlaroche.nl'),
(2, 2, 'De Ouwe Compagnie', 'Walstraat 39, 7511 GG Enschede', 'deouwecompagnie.nl'),
(3, 3, 'Big Belly\'s Tavern', 'Van Lochemstraat 230, 7511 PM Enschede', 'big-bellys.nl'),
(4, 4, 'burgerme Enschede', 'Willem Wilminkplein 27, 7511 PP Enschede', 'burgerme.nl'),
(5, 5, 'Blue Sakura', 'Oude Markt 21, 7511 GB Enschede', 'bluesakura.nl'),
(6, 6, 'Asaka', 'Zuiderhagen 53, 7511 GK Enschede', 'asaka.nl'),
(7, 7, 'Argentijns Steakhouse Grillmasters', 'Langestraat 54, 7511 HC Enschede', 'grillmasters.nl'),
(8, 8, 'Steakhouse Lutscher Alm B.V.', 'Lossersestraat 189, 7525 PE Enschede', 'lutscheralm.nl'),
(9, 9, 'Dutch premium grill @Home Enschede', 'Janninksweg 58, 7513 DL Enschede', 'dutchpg.nl'),
(10, 10, 'De Branderie', 'Hendrik Jan van Heekplein 35, 7511 HM Enschede', 'debranderie.nl'),
(11, 11, 'Ginza Sushi', 'Klanderij 50 A, 7511 HS Enschede', 'ginza-sushi.nl'),
(12, 12, 'Gastrobarbijrozendaal', 'Het Rozendaal 10, 7523 XG Enschede', 'gastrobarbijrozendaal.nl'),
(13, 13, 'Restaurant Hanninkshof', 'Usselerhofweg 5, 7548 RZ Enschede', 'hanninkshof.nl'),
(14, 14, 'puntoPASTA', 'Hendrik Jan van Heekplein 62, 7511 HN Enschede', 'puntopasta.nl'),
(15, 15, 'Lunchroom Het Rigtpunt', 'Rigtersbleek-Aalten 4, 7521 RB Enschede', 'lunchroomrigtpunt.nl'),
(16, 16, 'Heel Bijzonder Enschede', 'De Heurne 47, 7511 GZ Enschede', 'heelbijzonder.com'),
(17, 17, 'Goodys', 'Marktstraat 2, 7511 GD Enschede', 'goodys.nl'),
(18, 18, 'Joop\'s Broodjes', 'Deurningerstraat 57, 7514 BD Enschede', 'joopsbroodjes.nl'),
(19, 19, 'Oh my grill', 'Hengelosestraat 170, 7521 AK Enschede', 'ohmygrill.nl'),
(20, 20, 'Ana Doner V.O.F.', 'G.J. van Heekstraat 245, 7521 EE Enschede', 'anadoner.ultimatumapp.com'),
(21, 21, 'Spaans Restaurant Los Sueños \"mas que tapas\" in Enschede', 'Walstraat 41, 7511 GG Enschede', 'lossuenos.nl'),
(22, 22, 'Bistro Dreams Enschede', 'Walstraat 5, 7511 GE Enschede', 'bistrodreams.nl'),
(23, 23, 'Restaurant Haifa', 'Gronausestraat 1241, 7534 AJ Enschede', 'haifaenschede.nl'),
(24, 24, 'Sensazia All-in restaurant', 'Colosseum 80, 7521 PT Enschede', 'sensazia.nl'),
(25, 25, 'Kosie Restaurant', 'Van Lochemstraat 226, 7511 PM Enschede', 'kosie-restaurant.nl'),
(26, 26, 'Mazza Libanees Restaurant', 'Walstraat 1, 7511 GE Enschede', 'restaurantmazza.nl'),
(27, 27, 'Restaurant De Tropen', 'Bolwerkstraat 9, 7511 GP Enschede', 'restaurantdetropen.nl'),
(28, 28, 'Le Mans EET-DRINK & GENIET', 'Brouwerijplein 18, 7523 MB Enschede', 'lemansenschede.nl'),
(29, 29, 'Verso Cucina Italiana \'d Intenzo', 'Deurningerstraat 11, 7514 BC Enschede', 'restaurantverso.nl'),
(30, 30, 'Restaurant Turquoise', 'Korte Haaksbergerstraat 3, 7511 JV Enschede', 'turquoise-enschede.nl'),
(31, 31, 'CopaCabana Steakhouse & Tapasrestaurant', 'Oude Markt 31, 7511 GB Enschede', 'copacabana-cafe.nl'),
(32, 32, 'Restaurant Het Middelpunt', 'Rembrandtlaan 56, 7545 ZL Enschede', 'middelpunt-enschede.nl'),
(33, 33, 'Restaurant Zeytin', 'Haaksbergerstraat 98, 7513 EA Enschede', 'restaurantzeytin.nl'),
(34, 34, 'De Kater', 'Oude Markt 5, 7511 GA Enschede', 'dekater.com'),
(35, 35, 'Bistro en Wijnbar BRUUT (heropening op 17 september 2020)', 'Noorderhagen 42, 7511 EL Enschede', 'bistrobruut.nl'),
(36, 36, 'Habibi', 'Wethouder Beversstraat 185, 7543 BK Enschede', 'habibienschede.nl'),
(37, 37, 'Oaks Gastrobar', 'Stadsgravenstraat 47, 7511 EP Enschede', 'oaksgastrobar.nl'),
(38, 38, 'Ji-NOS', 'Oude Markt 28, 7511 GB Enschede', ''),
(39, 39, 'Restaurant Cozy', 'Marskant 34, 7551 BW Hengelo', 'restaurantcozy.nl'),
(40, 40, 'Sam Sam', 'Oude Markt 15, 7511 GA Enschede', 'samsam-enschede.nl'),
(41, 41, 'Eetcafé De Fusting', 'Hengelosestraat 281, 7521 AD Enschede', 'defusting.nl'),
(42, 42, 'Damascus restaurant', 'Noorderhagen 3, 7511 EJ Enschede', 'damascuseethuis.nl'),
(43, 43, 'Fabels', 'Oude Markt 4, 7511 GA Enschede', 'fabels-enschede.nl'),
(44, 44, 'Toons Snelbuffet', 'G.J. van Heekstraat 258, 7521 EL Enschede', 'toonssnelbuffet-enschede.nl'),
(45, 45, 'Frans op den Bult | Restaurant, Hotel, Zalen - Hengelo e.o.', 'Hengelosestraat 6, 7561 RT Deurningen', 'fransopdenbult.nl'),
(46, 46, 'Bardot Enschede', 'Langestraat 47c, 7511 HB Enschede', 'bardot.nl'),
(47, 47, 'De Pyramiden', 'Nieuwstraat 38, 7551 CZ Hengelo', 'pyramiden.nl'),
(48, 48, 'Turtles Pizza', 'Hengelosestraat 172, 7521 AK Enschede', 'turtlepizza.nl'),
(49, 49, 'Fletcher Hotel-Restaurant De Broeierd-Enschede', 'Hengelosestraat 725, 7521 PA Enschede', 'fletcherhotelenschede.nl'),
(50, 50, 'Restaurant Hisar', 'Burgemeester Jansenplein 50-54, 7551 ED Hengelo', 'restauranthisar.nl'),
(51, 51, 'Lovely Local', 'Walstraat 7, 7511 GE Enschede', 'lovelylocal.nl'),
(52, 52, 'Restaurant Joann', 'Nijverheidstraat 2, 7511 JM Enschede', 'restaurantjoann.nl'),
(53, 53, 'KFC', 'Kalanderstraat 2, 7511 HX Enschede', 'kfc.nl'),
(54, 54, 'Het Paradijs', 'Nicolaas Beetsstraat 48, 7514 CW Enschede', 'hetparadijs.com'),
(55, 55, 'Japans Restaurant TAO', 'Deurningerstraat 17, 7514 BC Enschede', 'restauranttao.nl'),
(56, 56, '\'t Lansink (Hotel - Restaurant)', 'C.T. Storkstraat 18, 7553 AR Hengelo', 'hotellansink.nl'),
(57, 57, 'Carlina\'s Latin Cuisine', 'Walstraat 69, 7511 GG Enschede', 'carlinas.nl'),
(58, 58, 'The Saloon', 'Walstraat 63, 7511 GG Enschede', 'the-saloon.nl'),
(59, 59, 'Restaurant de Basis', 'Walstraat 15-17, 7511 GE Enschede', 'terugnaardebasis.nu'),
(60, 60, 'Eethuis Toros', 'Brouwerijplein 28, 7523 MB Enschede', 'eethuistoros.nl'),
(61, 61, 'De Eetkamer', 'De Bleek 19, 7622 LJ Borne', 'eetkamer-borne.nl'),
(62, 62, 'Foodbar BLUFF', 'Oude Markt 6, 7511 GA Enschede', 'bluff.nl'),
(63, 63, 'Thais Restaurant Aroy-D', 'Noorderhagen 20, 7511 EL Enschede', 'aroy-d.nl'),
(64, 64, 'Hu\'s Garden', 'Oldenzaalsestraat 266, 7523 AG Enschede', 'husgarden.nl'),
(65, 65, 'Spice King India Enschede', 'Stadsgravenstraat 55, 7511 ER Enschede', 'spicekingindia.com'),
(66, 66, 'Grieks Restaurant Rhodos', 'Korte Haaksbergerstraat 13, 7511 JV Enschede', 'makro.rest'),
(67, 67, 'Argentijns restaurant poco mucho', 'Korte Haaksbergerstraat, 7511 JV Enschede', 'pocomucho-enschede.nl'),
(68, 68, 'Paddy\'s', 'Oude Markt 12, 7511 GA Enschede', 'paddys.nl'),
(69, 69, 'Saray Ocakbasi', 'Deurningerstraat 91C, 7514 BE Enschede', ''),
(70, 70, 'Balkan Restaurant', 'Drienerstraat 29, 7551 HK Hengelo', 'restaurantbalkan.nl'),
(71, 71, 'Brasserie Kachel', 'Bentrotstraat 45, 7531 AA Enschede', 'brasseriekachel.nl'),
(72, 72, 'Restaurant Thessaloniki', 'Langestraat 52, 7511 HC Enschede', 'thessalonikienschede.nl'),
(73, 73, 'Sapori e Ricordi', 'Haverstraatpassage 21, 7511 ET Enschede', 'saporiericordi.com'),
(74, 74, 'Grand Cafe De Steeg', 'Grotestraat 181-183, 7622 DD Borne', 'grandcafedesteeg.nl'),
(75, 75, 'Van der Valk Hotel Enschede', 'Zuiderval 140, 7543 EZ Enschede', 'vandervalkhotelenschede.nl'),
(76, 76, 'Sorrentino', 'Stadsgravenstraat 34, 36a, 7511 ES Enschede', 'sorrentino.nl'),
(77, 77, 'Fellini Enschede', 'Bolwerkstraat 2, 7511 GP Enschede', 'fellini.nu'),
(78, 78, 'Nyonya Meneer Indonesisch Eethuis', 'Walstraat 9, 7511 GE Enschede', 'nyonyameneer.nl'),
(79, 79, 'Snackkar aan huis \"Tukker food\" betrouwbaar en betaalbaar', 'Waalstraat 50, 7523 RK Enschede', 'tukker-food.nl'),
(80, 80, 'Restaurant de Oude Apotheek', 'Teylersstraat 4, 7581 AH Losser', 'oude-apotheek.nl'),
(81, 81, 'Humphrey\'s Restaurant Enschede', 'Oude Markt 3A, 7511 GA Enschede', 'humphreys.nl'),
(82, 82, 'Los Ponchos', 'Korte Haaksbergerstraat 2, 7511 JS Enschede', 'losponchos.nl'),
(83, 83, 'Yuzu Enschede', 'Van Loenshof 35, 7511 HE Enschede', 'yuzuenschede.nl'),
(84, 84, 'Masada', 'Wethouder Gerbertstraat 61, 7543 AW Enschede', 'masada.nl'),
(85, 85, 'Steakhouse El Gaucho', 'Zuiderhagen 16, 7511 GL Enschede', 'el-gaucho-enschede.nl'),
(86, 86, 'Eetcafé Bij Flip', 'Langestraat 58-60, 7511 HC Enschede', 'eetcafebijflip.nl'),
(87, 87, 'Vaperansa\'s Soul Food', 'Hoge Bothofstraat 39A, 7514 ZA Enschede', 'vaperansa.nl'),
(88, 88, 'Moeke Enschede', 'Oude Markt 8, 7511 GA Enschede', 'moekeenschede.nl'),
(89, 89, 'Restaurant & Grand Café The Gallery Enschede', 'Hengelosestraat 500, 7521 AN Enschede', 'gallerycatering.nl'),
(90, 90, 'Cafetaria Sylvia', 'Rijnstraat 74, 7523 GH Enschede', 'sylvia-enschede.nl'),
(91, 91, 'Van Doorn en Doorn', 'Steenbeltweg 48, 7523 VZ Enschede', 'vandoornendoorn.nl'),
(92, 92, 'Pinto Thai', 'Korte Haaksbergerstraat 11, 7511 JV Enschede', 'pintothai.nl'),
(93, 93, 'Light of India', 'Emmastraat 189, 7513 BC Enschede', 'ecocentrumemma.nl'),
(94, 94, 'Happy Italy', 'Willem Wilminkplein 31, 7511 PP Enschede', 'happyitaly.nl'),
(95, 95, 'De Pauw', 'Deurningerstraat 217, 7522 CB Enschede', ''),
(96, 96, 'Bistro C\'est Si Bon', 'Noorderhagen 54A, 7511 EM Enschede', 'cestsibon.nl'),
(97, 97, 'Mario\'s en Mario\'s Sweets', 'Hengelosestraat 184B, 7521 AK Enschede', 'marios-burgers.nl'),
(98, 98, 'Eetcafe ’t Raedthuys', 'Sint Maartenstraat 57, 7581 AK Losser', 'eetcaferaedthuys.nl'),
(99, 99, 'Restaurant De Stadsgracht', 'Stadsgravenstraat 57, 7511 ER Enschede', 'destadsgracht.nl'),
(100, 100, 'Restaurant ZIN', 'Noord Esmarkerrondweg 421-2, 7533 BL Enschede', 'restaurantzin.nl'),
(101, 101, 'Van der Poel', 'Oude Markt 23, 7511 GB Enschede', 'vanderpoelijs.nl'),
(102, 102, 'The green room', 'Beursstraat 44, 7551 HV Hengelo', ''),
(103, 103, 'Olympic', 'Korte Haaksbergerstraat 4, 7511 JS Enschede', 'grieksrestaurantenschede.nl'),
(104, 104, 'Bagels & Beans', 'Korte Hengelosestraat 33, 7511 JA Enschede', 'bagelsbeans.nl'),
(105, 105, 'Pulcinella B.V.', 'Deurningerstraat 91, 7514 BE Enschede', 'pizzeria-pulcinella.nl'),
(106, 106, 'Rosy\'s', 'Van Loenshof 86, 7511 NK Enschede', 'rosysfood.nl'),
(107, 107, 'Twentse Bierbrouwerij', 'Haaksbergerstraat 51, 7554 PA Hengelo', 'twentsebierbrouwerijproeflokaal.nl'),
(108, 108, 'De Lunchkamer', 'Roomweg 75, 7523 BL Enschede', 'lunchkamer.com'),
(109, 109, 'Kleinsman Eten en Drinken', 'Weerseloseweg 356, 7522 PT Enschede', ''),
(110, 110, 'Chinese Restaurant International', 'Boulevard 1945 322, 7511 AJ Enschede', 'chineesrestaurantenschede.nl'),
(111, 111, 'Restaurant Shalom - The Ribman', 'Willemstraat 54, 7551 DN Hengelo', 'shalom-hengelo.nl'),
(112, 112, 'Broasted Chicken', 'Kuipersdijk 5A, 7512 CA Enschede', 'broastedchicken.nl'),
(113, 113, 'Stravinsky eten · drinken · slapen', 'Burgemeester Jansenplein 20, 7551 ED Hengelo', 'stravinsky.nl'),
(114, 114, 'Tentje Teman²', 'Korte Haaksbergerstraat 46, 7511 JS Enschede', 'tentjeteman2.nl'),
(115, 115, 'HAOHAO', 'Langestraat 19, 7511 HA Enschede', 'wokhaohao.nl'),
(116, 116, 'Stichting Kookklup Lekker Eten', 'Spechtstraat 25, 7523 WJ Enschede', ''),
(117, 117, 'Restaurant De Broeierd', 'Hengelosestraat 725, 7521 PA Enschede', 'bistrodebroeierd.nl'),
(118, 118, 'JAMe Food Enschede', 'Willem Wilminkplein 27a, 7511 PP Enschede', 'jamefood.com'),
(119, 119, 'Restaurant Fleur De Sel', 'Beckumerstraat 20, 7548 BG Enschede', 'restaurantfleurdesel.nl'),
(120, 120, 'Shivani\'s Surinaams Eethuis', 'Lipperkerkstraat 33, 7511 CT Enschede', 'shivanis.nl'),
(121, 121, 'The Bombay Spice', 'Wemenstraat 59, 7551 EW Hengelo', 'bombayspice.nl'),
(122, 122, 'La Place', 'Raadhuisstraat 12, 7511 HK Enschede', 'laplace.com'),
(123, 123, 'Restaurant name', 'Enschede Centrum', 'Mail@gmail.com'),
(124, 124, 'Restaurant name', 'Enschede Centrum', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `superusers`
--

CREATE TABLE `superusers` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `streetname` text NOT NULL,
  `housenumber` smallint(6) NOT NULL,
  `postalcode` varchar(6) NOT NULL,
  `type` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `superusers`
--

INSERT INTO `superusers` (`id`, `username`, `password`, `email`, `phonenumber`, `city`, `streetname`, `housenumber`, `postalcode`, `type`, `created_at`) VALUES
(5, 'admin1', '$2b$12$Yg8DYoJ3ANJQ3NNgWxCwsO3UiuJ/MGWPEiMau7p9eFsfedc1RRG8u', 'admin@admin.com', '+31 06 11111111', 'Enschede', 'stationsplein', 5, '7555AA', 'restaurant_owner', '2020-09-30 13:39:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(16) NOT NULL DEFAULT 'customer' COMMENT 'Can either be customer or personnel'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `type`) VALUES
('10', '1234567890', 'customer'),
('11', '0987654321', 'customer'),
('12', '1234567890abcdef', 'customer'),
('12345679', NULL, 'customer'),
('12345680', NULL, 'customer'),
('12345681', NULL, 'customer'),
('12345682', NULL, 'customer'),
('12345683', NULL, 'customer'),
('13', '1234567890abcdef', 'customer'),
('14', '1234567890abcdef', 'customer'),
('15', '1234567890abcdef', 'customer'),
('16', '1234567890abcdef', 'customer'),
('17', 'someverylongrandomtoken', 'customer'),
('18', 'randomrandomrandom', 'customer'),
('19', 'someverylongrandomtoken', 'customer'),
('20', 'randomrandomrandom', 'customer'),
('21', 'someverylongrandomtoken', 'customer'),
('22', 'randomrandomrandom', 'customer'),
('23', 'someverylongrandomtoken', 'customer'),
('2387gh2w8n', NULL, 'customer'),
('24', 'randomrandomrandom', 'customer'),
('25', 'someverylongrandomtoken', 'customer'),
('26', 'randomrandomrandom', 'customer'),
('4', '1234567890', 'customer'),
('5', '1234567890', 'customer'),
('6', '1234567890', 'customer'),
('7', '1234567890', 'customer'),
('8', '1234567890', 'customer'),
('9', '1234567890', 'customer');

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
-- Indexes for table `superusers`
--
ALTER TABLE `superusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ggd_codes`
--
ALTER TABLE `ggd_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `superusers`
--
ALTER TABLE `superusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
