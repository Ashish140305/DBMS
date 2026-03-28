-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2026 at 06:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `investiq_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`log_id`, `user_id`, `action_type`, `amount`, `transaction_date`) VALUES
(1, 3, 'BUY ORDER', 1200.00, '2026-03-07 12:29:44'),
(3, 3, 'SELL ORDER', 1200.00, '2026-03-07 12:30:10'),
(4, 3, 'BUY ORDER', 1200.00, '2026-03-07 12:30:57'),
(5, 3, 'BUY ORDER', 1200.00, '2026-03-07 12:30:57'),
(6, 3, 'BUY ORDER', 1000.00, '2026-03-07 12:34:52'),
(7, 3, 'BUY ORDER', 1000.00, '2026-03-07 12:34:52'),
(8, 3, 'SELL ORDER', 1000.00, '2026-03-10 17:32:59'),
(9, 3, 'SELL ORDER', 1000.00, '2026-03-10 18:05:40'),
(10, 3, 'BUY ORDER', 1000.00, '2026-03-10 18:07:01'),
(11, 3, 'SELL ORDER', 1000.00, '2026-03-10 18:19:34'),
(12, 3, 'SELL ORDER', 1200.00, '2026-03-10 18:19:37'),
(13, 3, 'SELL ORDER', 5000.00, '2026-03-10 18:19:40'),
(14, 3, 'BUY ORDER', 100.00, '2026-03-22 12:45:20'),
(15, 3, 'SELL ORDER', 5000.00, '2026-03-22 15:44:01'),
(16, 3, 'SELL ORDER', 1200.00, '2026-03-22 15:44:03'),
(17, 3, 'BUY ORDER', 2345.00, '2026-03-22 15:47:05'),
(18, 3, 'BUY ORDER', 2000.00, '2026-03-22 15:50:13'),
(19, 3, 'BUY ORDER', 234.00, '2026-03-22 15:52:19'),
(20, 3, 'SELL ORDER', 1200.00, '2026-03-26 12:56:18'),
(21, 3, 'BUY ORDER', 1000.00, '2026-03-26 13:02:50'),
(22, 3, 'BUY ORDER', 20000.00, '2026-03-27 04:39:11'),
(23, 3, 'BUY ORDER', 1000.00, '2026-03-27 04:50:11'),
(24, 3, 'SELL ORDER', 1000.00, '2026-03-27 04:50:33'),
(25, 3, 'SELL ORDER', 1200.00, '2026-03-28 15:48:09');

-- --------------------------------------------------------

--
-- Table structure for table `mutual_funds`
--

CREATE TABLE `mutual_funds` (
  `id` int(11) NOT NULL,
  `fund_name` varchar(255) NOT NULL,
  `ticker_symbol` varchar(50) NOT NULL,
  `current_nav` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mutual_funds`
--

INSERT INTO `mutual_funds` (`id`, `fund_name`, `ticker_symbol`, `current_nav`) VALUES
(10, 'Reliance Industries Ltd.', 'RELIANCE.NS', 0.00),
(11, 'Tata Consultancy Services', 'TCS.NS', 0.00),
(12, 'HDFC Bank Limited', 'HDFCBANK.NS', 0.00),
(15, 'Nippon India Nifty 50 BeES (ETF)', 'NIFTYBEES.NS', 0.00),
(16, 'CEAT LIMITED', 'CEATLTD.NS', 0.00),
(17, 'E-mini S&P Regional Banks Selec', 'SXB=F', 0.00),
(18, 'TATA CAPITAL LIMITED', 'TATACAP.NS', 0.00),
(20, 'Honda Motor Company, Ltd.', 'HMC', 0.00),
(23, 'ADANI GREEN ENERGY LTD', 'ADANIGREEN.NS', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fund_id` int(11) NOT NULL,
  `investment_amount` decimal(15,2) NOT NULL,
  `investment_type` varchar(50) NOT NULL,
  `investment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `user_id`, `fund_id`, `investment_amount`, `investment_type`, `investment_date`) VALUES
(35, 3, 11, 1200.00, 'Delivery', '2026-03-07'),
(37, 3, 17, 1000.00, 'Delivery', '2026-03-07'),
(38, 3, 18, 1000.00, 'Delivery', '2026-03-10'),
(39, 3, 18, 100.00, 'Delivery', '2026-03-22'),
(42, 3, 12, 2345.00, 'Delivery', '2026-03-22'),
(44, 3, 15, 2000.00, 'Delivery', '2026-03-22'),
(45, 3, 12, 234.00, 'Delivery', '2026-03-22'),
(46, 3, 15, 1000.00, 'Delivery', '2026-03-26'),
(47, 3, 16, 20000.00, 'Delivery', '2026-03-27');

--
-- Triggers `portfolio`
--
DELIMITER $$
CREATE TRIGGER `after_stock_buy` AFTER INSERT ON `portfolio` FOR EACH ROW BEGIN
    INSERT INTO audit_logs (user_id, action_type, amount)
    VALUES (NEW.user_id, 'BUY ORDER', NEW.investment_amount);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_stock_sell` AFTER DELETE ON `portfolio` FOR EACH ROW BEGIN
    INSERT INTO audit_logs (user_id, action_type, amount)
    VALUES (OLD.user_id, 'SELL ORDER', OLD.investment_amount);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `wallet_balance` decimal(15,2) DEFAULT 100000.00,
  `full_name` varchar(100) DEFAULT '',
  `phone` varchar(20) DEFAULT '',
  `financial_goal` varchar(100) DEFAULT 'Build Wealth',
  `profile_picture` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `wallet_balance`, `full_name`, `phone`, `financial_goal`, `profile_picture`) VALUES
(1, 'DemoUser', 'demo@investiq.com', '$2a$10$X8/XpQ5V5.5j5.5j5.5j5.5j5.5j5.5j5.5j5.5j5.5j5.5j5.5j5', '2026-02-23 14:54:34', 120000.00, '', '', 'Build Wealth', NULL),
(2, 'Aniket', 'aniket@test.com', '$2b$10$70o00sHCgqVIsXjto6rDReYM8iifxqhM7V20Qblu0Bl5Aqq.eQuMK', '2026-02-23 15:04:06', 120000.00, '', '', 'Build Wealth', NULL),
(3, 'Ashish Chaurasiya', 'ashish@investiq.com', '$2b$10$1MMDM0j0CgHHe5SCvj.DzOkp/1G.knS2KBo.b6Pw/mn.uNz2PM5Tm', '2026-02-23 15:18:33', 121326.51, 'Ashish Chaurasiya', '9999999999', 'Build Wealth', 'data:image/png;base64,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');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ticker_symbol` varchar(50) NOT NULL,
  `fund_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`id`, `user_id`, `ticker_symbol`, `fund_name`, `created_at`) VALUES
(4, 3, 'RELIANCE.NS', 'Reliance Industries Ltd.', '2026-03-22 15:01:02'),
(5, 3, 'HMC', 'Honda Motor Company, Ltd.', '2026-03-26 13:03:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `mutual_funds`
--
ALTER TABLE `mutual_funds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fund_id` (`fund_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_asset` (`user_id`,`ticker_symbol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `mutual_funds`
--
ALTER TABLE `mutual_funds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`fund_id`) REFERENCES `mutual_funds` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
